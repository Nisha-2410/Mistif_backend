// routes/Compare.js
const express = require("express");
const { scrapeNykaa } = require("../scraper/NykkaScraper");
const extractKeywords = require("../utils/extractKeywords");
const { filterProductsWithLLM } = require("../utils/filterProduct"); // updated import
const { analyzeProduct } = require("../scraper/product"); 
const { scrapeProductReviews } = require("../scraper/Review");

const router = express.Router();

// Limit for detailed analysis
const MAX_DETAILED_PRODUCTS = 5;

router.get("/compare", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Missing query param" });

  try {
    // Step 1: Extract keywords from query
    const keywords = await extractKeywords(query);
    console.log("extracted keywords:", keywords);

    // Step 2: Build search string
    const searchString = [
      keywords.productType,
      ...(keywords.attributes || []),
      ...(keywords.targetAudience || []),
    ]
      .filter(Boolean)
      .join(" ");
    console.log("🔍 Search string:", searchString);

    // Step 3: Scrape products from Nykaa
    const firstLevelProducts = await scrapeNykaa(searchString);
    if (!firstLevelProducts?.length) {
      return res.status(404).json({ error: "No products found" });
    }

    // Step 4: Rank products using LLM based on titles only
    const topProducts = await filterProductsWithLLM(firstLevelProducts, query);
    if (!topProducts.length) {
      return res.status(404).json({ error: "No products matched filters" });
    }
    console.log("Top 3 products by title relevance:", topProducts);

    // Step 5: Restrict to top N products for LLM detailed analysis
    const limitedProducts = topProducts.slice(0, MAX_DETAILED_PRODUCTS);

    // Step 6: Run LLM analyzer with reviews
    const detailedProducts = await Promise.all(
      limitedProducts.map(async (prod) => {
        try {
          // Scrape reviews for each product
          let reviews = await scrapeProductReviews(prod.link, 20); // you can reduce to 10 if too heavy
          console.log(`Fetched ${reviews.length} reviews for ${prod.name}`);

          // Analyze product
          const analysis = await analyzeProduct(
            prod.name,    // product title
            null,         // description
            query,        // user query
            reviews       // array of review strings
          );

          return {
            ...prod,
            ...analysis, // includes whyBestForQuery, keyFeatures, matchScore, reviewsSummary
          };
        } catch (err) {
          console.error(`❌ Error analyzing product ${prod.link}:`, err.message);
          return null;
        }
      })
    );

    const validProducts = detailedProducts.filter(Boolean);
    if (!validProducts.length) {
      return res.status(404).json({ error: "No analyzed products found" });
    }

    res.json({ products: validProducts });
  } catch (err) {
    console.error("❌ Compare route error:", err.message);
    res.status(500).json({ error: "Failed to compare products" });
  }
});

module.exports = router;
