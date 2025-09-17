// nykaaScraper.js
const cheerio = require("cheerio");
const { fetchRenderedHTML } = require("./BrightDataFetcher");

async function scrapeNykaa(query) {
  try {
    const targetUrl = `https://www.nykaa.com/search/result/?q=${encodeURIComponent(query)}`;
    console.log(`🔍 Searching Nykaa for: ${query}`);
    
    const html = await fetchRenderedHTML(targetUrl);
    if (!html) {
      console.error("❌ No HTML returned from Web Unlocker");
      return [];
    }

    const $ = cheerio.load(html);
    const products = [];

    $(".productWrapper.css-17nge1h").each((i, el) => {
      const name = $(el).find(".css-xrzmfa").text().trim();
      const price = $(el).find(".css-111z9ua").text().trim();
      const relativeLink = $(el).find("a").attr("href");

      const link = relativeLink
        ? "https://www.nykaa.com" + relativeLink
        : null;

      if (name && price && link) {
        products.push({ name, price, link });
      }
    });

    console.log(`✅ Found ${products.length} products`,products);
    return products;

  } catch (err) {
    console.error("🚨 scrapeNykaa error:", err.message);
    return [];
  }
}

module.exports = { scrapeNykaa };

