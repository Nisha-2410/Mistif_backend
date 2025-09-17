import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper to remove code fences and extra whitespace
function cleanJSON(raw) {
  if (!raw) return raw;
  return raw.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();
}

/**
 * Summarizes reviews into pros, cons, and overall vibe
 * @param {Array<{rating:number, title:string, review:string}>} reviews
 * @returns {Object} { pros: [], cons: [], overallVibe: string }
 */
async function summarizeReviews(reviews) {
  if (!reviews.length) {
    return { pros: [], cons: [], overallVibe: "No reviews available" };
  }

  // Format reviews for better LLM understanding
  const formattedReviews = reviews
    .map(r => `${r.rating}⭐ | ${r.title || ""} | ${r.review || ""}`)
    .join("\n");

  const prompt = `
You are a helpful product review assistant.

Summarize the following reviews into JSON with keys:
- "pros": array of positive points mentioned
- "cons": array of negative points mentioned
- "buyReasons": 3 concise points explaining why a customer should buy this product
- "avoidReasons": 3 concise points explaining why a customer might not want to buy it

Reviews:
${formattedReviews}

Return ONLY valid JSON.
`;


  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const rawText = response.choices[0]?.message?.content?.trim();
    const cleaned = cleanJSON(rawText);

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("🚨 Error summarizing reviews:", err.message);
    return { pros: [], cons: [], overallVibe: "Summary unavailable" };
  }
}

export { summarizeReviews };


