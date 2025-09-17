const scrapeNykaa = require('./Nykaa');
const scrapeFlipkart = require('./flipkart'); // add when ready
const { getMarketplaces } = require('./marketplaceRouter'); // ← this file you wrote

async function runScrapers(query) {
  const selectedMarkets = getMarketplaces(query);
  const results = [];

  for (const market of selectedMarkets) {
    if (market === 'nykaa') {
      const nykaaData = await scrapeNykaa(query);
      if (nykaaData.length) results.push(...nykaaData);
    }

    if (market === 'flipkart') {
      const flipkartData = await scrapeFlipkart(query); // later
      if (flipkartData.length) results.push(...flipkartData);
    }
  }

  return results;
}

module.exports = runScrapers;

