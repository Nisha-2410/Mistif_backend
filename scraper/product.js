import OpenAI from "openai";
import { summarizeReviews } from "../utils/Summarise.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Clean JSON output
function cleanJSON(raw) {
  if (!raw) return raw;
  return raw.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();
}

/**
 * Analyze whether a product truly satisfies the user's specific needs
 * based on reviews and general product context.
 *
 * Example userQuery: "best moisturizer for dry sensitive skin"
 */
export async function analyzeProduct(
  productName,
  description,
  userQuery,     // user's needs / goal
  reviews = [],
  productLink,
  price,
  image
) {
  // Step 1: Summarize all reviews into a compact, factual overview
  const reviewsSummary = await summarizeReviews(reviews);

  // Step 2: Send everything to the LLM for requirement-based reasoning
  const prompt = `
You are a skincare and beauty expert who evaluates if a product truly fits what the user needs.

User's Need: "${userQuery}"
Product: "${productName}"
Description (if any): ${description ? description : "N/A"}
Reviews Summary: ${JSON.stringify(reviewsSummary, null, 2)}

Your job:
1. Understand exactly what the user is asking for (e.g., dry skin, acne, glow, lightweight texture, etc.).
2. Carefully analyze the reviews summary to see if users mention results related to those needs.
3. If reviews confirm that it works well for those conditions, note it.
4. If reviews contradict or don’t mention it, mention that clearly.
5. Provide a balanced, human-like judgment.

Return ONLY valid JSON in this format:
{
  "productName": "${productName}",
  "productLink": "${productLink}",
  "price": "${price || "N/A"}",
  "image": "${image || ""}",
  "summary": "One short paragraph summarizing whether this product truly fits the user's needs.",
  "matchEvidence": {
    "positive": ["list of short evidences from reviews that confirm the match"],
    "negative": ["list of short evidences from reviews that contradict or don’t support the match"]
  },
  "matchScore": <number between 0 and 100, representing how well this product satisfies the user's need>,
  "finalVerdict": "one-line verdict like 'Highly suitable', 'Partially suitable', or 'Not suitable'"
}
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a skincare expert that judges if products actually satisfy user needs based on review data." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const rawOutput = response.choices[0]?.message?.content?.trim();
    const cleaned = cleanJSON(rawOutput);
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ JSON parse failed in analyzeProduct:", err.message);
    return {
      productName,
      productLink,
      price: price || "N/A",
      image: image || "",
      summary: "⚠️ Unable to analyze product fit for user needs.",
      matchEvidence: { positive: [], negative: [] },
      matchScore: 0,
      finalVerdict: "Analysis unavailable",
    };
  }
}









