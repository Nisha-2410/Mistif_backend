import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Rank products using only titles via LLM and return top 3
 * @param {Array} products - Array of product objects { name, link, ... }
 * @param {string} userQuery - User's natural language query
 */
async function filterProductsWithLLM(products, userQuery) {
  const productList = products.map((p, i) => ({
    id: i + 1,
    name: p.name,
  }));

  const prompt = `
The user is searching with this query: "${userQuery}".

Here is the product list:
${JSON.stringify(productList, null, 2)}

Task:
- Rate how well each product TITLE matches the query.
- Assign a "matchScore" from 0–100 (higher = better).
- Provide a short reason (max 1 sentence).

Return ONLY JSON in this format:
[
  {
    "id": <product id>,
    "matchScore": <0-100>,
    "reason": "<short reason>"
  }
]
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that ranks products based on title relevance." },
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
  return scoredProducts.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}

export { filterProductsWithLLM };




