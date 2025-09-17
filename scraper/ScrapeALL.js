// scraper/scrapeAllMarkets.js
const { scrapeNykaa } = require("./NykkaScraper");
const scrapePurplle = require("./PurplleScraper");
// later: const { scrapeTira } = require("./tiraScraper");

async function scrapeAllMarkets(query) {
  const results = [];

  try {
    const [nykaaProducts, purplleProducts] = await Promise.all([
      scrapeNykaa(query),
      scrapePurplle(query),
      // add more scrapers here
    ]);

    results.push(
      ...nykaaProducts.map(p => ({ ...p, source: "Nykaa" })),
      ...purplleProducts.map(p => ({ ...p, source: "Purplle" }))
    );
  } catch (err) {
    console.error("❌ scrapeAllMarkets error:", err.message);
  }

  return results;
}

module.exports = { scrapeAllMarkets };
