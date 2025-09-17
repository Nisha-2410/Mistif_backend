// utils/extractKeywords.js
const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function extractKeywords(userQuery) {
  const prompt = `
You are a smart shopping assistant.
Your job: understand a product search query and expand it into structured product requirements.

Return JSON only, with these fields:
{
  "productType": "main category or type of product",
  "attributes": ["functional qualities like matte, hydrating, long-lasting, brightening"],
  "targetAudience": ["intended user group, e.g. men, women, teens, sensitive skin"],
  "ingredients": ["relevant beneficial ingredients based on needs, e.g. niacinamide, hyaluronic acid, zinc oxide"],
  "concerns": ["skin or hair concerns the product should solve, e.g. acne, dryness, dark spots, dandruff"]
}

### Rules:
- Expand beyond literal keywords. Infer hidden needs.
- Map common skin concerns → known beneficial ingredients.
- Map skin type → suitable product qualities.
- Map weather conditions → performance-related features.
- Only include relevant items, keep arrays concise.

Query: "${userQuery}"
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    let content = completion.choices[0].message.content;
    content = content.replace(/```json|```/g, "").trim(); // Clean up JSON blocks

    return JSON.parse(content);
  } catch (err) {
    console.error("❌ Keyword extraction failed:", err.message);
    return { productType: "", attributes: [], targetAudience: [], ingredients: [], concerns: [] };
  }
}

module.exports = extractKeywords;

