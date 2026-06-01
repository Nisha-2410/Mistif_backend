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
const INTENT_MAP = [
  { phrases: ["acne", "pimple", "pimples", "breakout", "breakouts"], concerns: ["acne"], ingredients: ["salicylic acid", "niacinamide"] },
  { phrases: ["oily", "oiliness", "greasy"], concerns: ["oiliness"], attributes: ["lightweight", "matte"], ingredients: ["niacinamide"] },
  { phrases: ["dry", "dryness"], concerns: ["dryness"], attributes: ["hydrating"], ingredients: ["ceramides", "hyaluronic acid"] },
  { phrases: ["sensitive", "sensitivity", "irritation", "irritate"], concerns: ["sensitivity"], attributes: ["gentle"], ingredients: ["panthenol", "ceramides"] },
  { phrases: ["dull", "dullness"], concerns: ["dullness"], attributes: ["brightening"], ingredients: ["vitamin c"] },
  { phrases: ["pigmentation", "hyperpigmentation", "dark spot", "dark spots"], concerns: ["pigmentation", "dark spots"], attributes: ["brightening"], ingredients: ["vitamin c", "niacinamide"] },
  { phrases: ["blackhead", "blackheads", "congestion", "clogged pores"], concerns: ["blackheads", "pores"], ingredients: ["salicylic acid"] },
  { phrases: ["redness", "red", "inflamed"], concerns: ["redness"], attributes: ["calming"], ingredients: ["cica", "panthenol"] },
  { phrases: ["fine line", "fine lines", "wrinkle", "wrinkles", "aging"], concerns: ["fine lines", "aging"], ingredients: ["retinol"] },
  { phrases: ["spf", "sunscreen", "sun protection"], concerns: ["sun protection"], attributes: ["lightweight"] }
];
const KNOWN_INGREDIENTS = [
  "alpha arbutin",
  "salicylic acid",
  "hyaluronic acid",
  "tranexamic acid",
  "glycolic acid",
  "lactic acid",
  "vitamin c",
  "niacinamide",
  "ceramides",
  "panthenol",
  "retinol",
  "cica",
  "bha",
  "aha",
  "pha"
];

function uniq(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function hasPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp(`\\b${escaped}\\b`).test(text);
}

function heuristicExtractKeywords(userQuery) {
  const normalized = String(userQuery || "").toLowerCase().replace(/[^a-z0-9 ]+/g, "");
  const tokens = normalized.split(/\s+/).filter(Boolean);

  let productType =
    PRODUCT_TYPES.find((type) => normalized.includes(type)) ||
    (normalized.includes("spf") ? "sunscreen" : "") ||
    (normalized.includes("face wash") ? "cleanser" : "");

  const attributes = [];
  const targetAudience = [];
  const ingredients = [];
  const concerns = [];

  for (const token of tokens) {
    if (ATTRIBUTE_MAP[token]) {
      attributes.push(...ATTRIBUTE_MAP[token]);
    }

  }

  for (const intent of INTENT_MAP) {
    if (intent.phrases.some((phrase) => hasPhrase(normalized, phrase))) {
      attributes.push(...(intent.attributes || []));
      ingredients.push(...(intent.ingredients || []));
      concerns.push(...(intent.concerns || []));
    }
  }

  for (const ingredient of KNOWN_INGREDIENTS) {
    if (hasPhrase(normalized, ingredient)) ingredients.push(ingredient);
  }

  if (!productType && ingredients.length) productType = "serum";

  if (hasPhrase(normalized, "men")) targetAudience.push("men");
  if (hasPhrase(normalized, "women")) targetAudience.push("women");
  if (hasPhrase(normalized, "teen") || hasPhrase(normalized, "teens")) targetAudience.push("teens");
  if (normalized.includes("summer") || normalized.includes("humid")) attributes.push("lightweight");
  if (normalized.includes("winter")) attributes.push("hydrating");
  if (normalized.includes("irritat") || normalized.includes("beginner") || normalized.includes("first ")) {
    attributes.push("gentle");
    concerns.push("sensitivity");
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
