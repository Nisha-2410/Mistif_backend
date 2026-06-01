const OpenAI = require("openai");

const PRODUCT_TYPES = ["cleanser", "moisturizer", "serum", "sunscreen", "exfoliant"];
const ATTRIBUTE_MAP = {
  hydrating: ["hydrating"],
  matte: ["matte"],
  lightweight: ["lightweight"],
  gentle: ["gentle"],
  brightening: ["brightening"],
  calming: ["calming"],
  nongreasy: ["non-greasy"]
};
const CONCERN_MAP = {
  acne: { concerns: ["acne"], ingredients: ["salicylic acid", "niacinamide"] },
  pimples: { concerns: ["acne"], ingredients: ["salicylic acid", "niacinamide"] },
  oily: { concerns: ["oiliness"], attributes: ["lightweight", "matte"], ingredients: ["niacinamide"] },
  dry: { concerns: ["dryness"], attributes: ["hydrating"], ingredients: ["ceramides", "hyaluronic acid"] },
  sensitive: { concerns: ["sensitivity"], attributes: ["gentle"], ingredients: ["panthenol", "ceramides"] },
  dull: { concerns: ["dullness"], attributes: ["brightening"], ingredients: ["vitamin c"] },
  pigmentation: { concerns: ["pigmentation"], attributes: ["brightening"], ingredients: ["vitamin c", "niacinamide"] },
  darkspots: { concerns: ["dark spots"], attributes: ["brightening"], ingredients: ["vitamin c", "niacinamide"] },
  blackheads: { concerns: ["blackheads"], ingredients: ["salicylic acid"] },
  redness: { concerns: ["redness"], attributes: ["calming"], ingredients: ["cica", "panthenol"] },
  retinol: { concerns: ["fine lines", "texture"], ingredients: ["retinol"] },
  sunscreen: { concerns: ["sun protection"], attributes: ["lightweight"] }
};

function uniq(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function heuristicExtractKeywords(userQuery) {
  const normalized = String(userQuery || "").toLowerCase().replace(/[^a-z0-9 ]+/g, "");
  const tokens = normalized.split(/\s+/).filter(Boolean);

  const productType =
    PRODUCT_TYPES.find((type) => normalized.includes(type)) ||
    (normalized.includes("spf") ? "sunscreen" : "") ||
    (normalized.includes("face wash") ? "cleanser" : "") ||
    (normalized.includes("retinol") ? "serum" : "");

  const attributes = [];
  const targetAudience = [];
  const ingredients = [];
  const concerns = [];

  for (const token of tokens) {
    if (ATTRIBUTE_MAP[token]) {
      attributes.push(...ATTRIBUTE_MAP[token]);
    }

    const match = CONCERN_MAP[token];
    if (match) {
      attributes.push(...(match.attributes || []));
      ingredients.push(...(match.ingredients || []));
      concerns.push(...(match.concerns || []));
    }
  }

  if (normalized.includes("men")) targetAudience.push("men");
  if (normalized.includes("women")) targetAudience.push("women");
  if (normalized.includes("teen")) targetAudience.push("teens");
  if (normalized.includes("summer") || normalized.includes("humid")) attributes.push("lightweight");
  if (normalized.includes("winter")) attributes.push("hydrating");
  if (normalized.includes("irritat") || normalized.includes("beginner") || normalized.includes("first retinol")) {
    attributes.push("gentle");
    concerns.push("sensitivity");
  }
  if (normalized.includes("retinol")) {
    ingredients.push("retinol");
    if (!productType) targetAudience.push("beginner");
  }

  const budgetMatch = normalized.match(/under\s+(\d+)/);
  let price = "";
  if (budgetMatch) {
    price = `under ${budgetMatch[1]}`;
  } else if (normalized.includes("budget") || normalized.includes("affordable")) {
    price = "budget";
  } else if (normalized.includes("premium")) {
    price = "premium";
  }

  return {
    productType,
    attributes: uniq(attributes),
    targetAudience: uniq(targetAudience),
    ingredients: uniq(ingredients),
    concerns: uniq(concerns),
    price
  };
}

async function llmExtractKeywords(userQuery) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return heuristicExtractKeywords(userQuery);
  }

  const client = new OpenAI({ apiKey });
  const prompt = `
You are a smart shopping assistant.
Understand the user's skincare shopping request and convert it into JSON only.

Return this exact shape:
{
  "productType": "cleanser | moisturizer | serum | sunscreen | exfoliant | ''",
  "attributes": ["lightweight", "hydrating", "gentle", "matte", "brightening", "calming"],
  "targetAudience": ["men", "women", "teens", "sensitive skin", "oily skin"],
  "ingredients": ["niacinamide", "salicylic acid", "ceramides", "hyaluronic acid", "vitamin c", "cica", "retinol"],
  "concerns": ["acne", "dryness", "oiliness", "pigmentation", "sensitivity", "blackheads", "redness"],
  "price": "budget phrase if any"
}

User query: "${userQuery}"
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  const content = (completion.choices[0]?.message?.content || "").replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(content);
  return {
    productType: parsed.productType || "",
    attributes: uniq(parsed.attributes || []),
    targetAudience: uniq(parsed.targetAudience || []),
    ingredients: uniq(parsed.ingredients || []),
    concerns: uniq(parsed.concerns || []),
    price: parsed.price || ""
  };
}

async function extractKeywords(userQuery) {
  try {
    return await llmExtractKeywords(userQuery);
  } catch (err) {
    console.error("Keyword extraction failed, using heuristic fallback:", err.message);
    return heuristicExtractKeywords(userQuery);
  }
}

module.exports = extractKeywords;
