import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Rank products using extracted keywords via LLM and return top 3
 * @param {Array} products - Array of product objects { name, link, ... }
 * @param {Object} keywordJSON - Extracted keywords from user query
 *        { productType, attributes, targetAudience, ingredients, concerns }
 */
async function filterProductsWithLLM(products, keywordJSON) {
  const productList = products.map((p, i) => ({
    id: i + 1,
    name: p.name,
  }));

const prompt = `
You are an expert product recommender specializing in skincare, haircare, and cosmetics.

User query intent:
- Product type: ${keywordJSON.productType || "unknown"}
- Key attributes: ${keywordJSON.attributes?.join(", ") || "none"}
- Target audience: ${keywordJSON.targetAudience?.join(", ") || "none"}
- Ingredients focus: ${keywordJSON.ingredients?.join(", ") || "none"}
- Skin/Hair concerns: ${keywordJSON.concerns?.join(", ") || "none"}
- Price range: ${keywordJSON.price || "none"}

Brand cues (memorize before ranking):
- Cetaphil → sensitive skin
- CeraVe → dry skin, barrier repair
- La Roche-Posay → acne, sunscreen, sensitivity
- Paula’s Choice → exfoliation, acne
- The Ordinary → actives for pigmentation, anti-aging
- Minimalist → Indian equivalent of The Ordinary
- Plum → acne, green tea
- Neutrogena → acne, sunscreen
- Clinique → sensitive, allergy-tested
- Kama Ayurveda → natural, ayurvedic
- Indulekha → hair fall
- Biotique → herbal, budget range
- Mamaearth → natural, Indian market
- Dot & Key → actives, gentle
- Re’equil → dermatologist-approved Indian brand

You only have access to product titles — no descriptions.
Infer the product’s relevance using textual clues:
- Brand reputation (what it’s known for)
- Keywords in title (SPF, Vitamin C, Retinol, Hydrating, etc.)
- Product format (serum, cleanser, toner, shampoo, etc.)
- Target indicators (“for oily skin”, “for dandruff”, etc.)
- Active ingredients that align with user needs.

Estimate how well each title matches the user’s intent **only from these clues**.
Give each product a matchScore (0–100) and a one-line reason.
Return only JSON in this format:

[
  { "id": <product id>, "matchScore": <0–100>, "reason": "<short reason>" }
]
`;


  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that ranks products based on keyword relevance." },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  const rawOutput = response.choices[0]?.message?.content?.trim();
  let ranking = [];
  try {
    ranking = JSON.parse(rawOutput);
  } catch (err) {
    console.error("❌ Failed to parse LLM ranking:", err.message);
    return products.slice(0, 3); // fallback
  }

  // Merge LLM scores with original products
  const scoredProducts = ranking.map(r => {
    const product = products[r.id - 1];
    return {
      ...product,
      matchScore: r.matchScore,
      matchReason: r.reason,
    };
  });

  // Sort and return only top 3
  return scoredProducts.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
}

export { filterProductsWithLLM };





