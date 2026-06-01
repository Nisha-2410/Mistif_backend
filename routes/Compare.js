const express = require("express");
const extractKeywords = require("../utils/extractKeywords");
const { productCatalog } = require("../data/productCatalog");
const { recommendProducts } = require("../utils/recommendProducts");

const router = express.Router();

router.get("/compare", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Missing query param" });
  }

  try {
    const keywords = await extractKeywords(query);
    const products = recommendProducts(productCatalog, keywords, query, 6);

    if (!products.length) {
      return res.status(404).json({ error: "No products matched your request" });
    }

    return res.json({
      query,
      keywords,
      catalogSize: productCatalog.length,
      products
    });
  } catch (err) {
    console.error("Compare route error:", err.message);
    return res.status(500).json({ error: "Failed to compare products" });
  }
});

module.exports = router;
