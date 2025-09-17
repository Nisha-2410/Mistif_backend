// utils/productAnalyzer.js
import OpenAI from "openai";
import { summarizeReviews } from "../utils/Summarise.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: remove code fences and extra whitespace
function cleanJSON(raw) {
  if (!raw) return raw;
  return raw.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();
}

async function analyzeProduct(productName, description, userQuery, reviews = [], productLink, price) {
  const reviewsSummary = await summarizeReviews(reviews);

 const prompt = `
You are a skincare + beauty expert who talks like a friendly, honest friend.

User Query: "${userQuery}"
Reviews Summary: ${JSON.stringify(reviewsSummary)}

Task:
1. Based on the user's query, explain in 3–4 points why "${productName}" is a good match for this user.
2. Include key features (category, SPF, texture, finish, skin type suitability, ingredients, extra benefits, price).
3. Also generate 2–3 concise points why the user might NOT want to buy this product if it does not perfectly match their needs.

Return ONLY JSON in this format:
{
  "productName": "${productName}",
  "productLink": "${productLink}",
  "price": "${price || "N/A"}",
  "whyBestForQuery": ["..."], 
  "keyFeatures": ["..."],
  "reviewsSummary": ${JSON.stringify(reviewsSummary)},
  "avoidReasons": ["..."]
}
`;


  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful skincare & beauty analysis assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const rawOutput = response.choices[0]?.message?.content?.trim();
    const cleaned = rawOutput.replace(/```(?:json)?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ JSON parse failed in analyzeProduct:", err.message);
    return {
      productName,
      productLink,
      price: price || "N/A",
      whyBestForQuery: ["⚠️ Analysis unavailable."],
      keyFeatures: [],
      reviewsSummary,
    };
  }
}


export { analyzeProduct };







