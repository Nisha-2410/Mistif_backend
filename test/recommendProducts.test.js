const assert = require("assert");
const extractKeywords = require("../utils/extractKeywords");
const { productCatalog } = require("../data/productCatalog");
const { recommendProducts } = require("../utils/recommendProducts");

const cases = [
  ["first retinol that won't irritate me", "serum", "retinol"],
  ["vitamin c serum for dark spots", "serum", "vitamin c"],
  ["alpha arbutin serum for pigmentation", "serum", "alpha arbutin"],
  ["salicylic acid cleanser for acne under 400", "cleanser", "salicylic acid"],
  ["ceramide moisturizer for dry sensitive skin", "moisturizer", "ceramide"],
  ["matte sunscreen for oily skin under 700", "sunscreen", "sunscreen"],
  ["hydrating sunscreen for dry skin", "sunscreen", "sunscreen"],
  ["bha exfoliant for blackheads", "exfoliant", "bha"],
  ["calming serum for redness", "serum", "serum"],
  ["gentle cleanser for sensitive skin", "cleanser", "cleanser"]
];

async function run() {
  for (const [query, expectedType, expectedText] of cases) {
    const keywords = await extractKeywords(query);
    const products = recommendProducts(productCatalog, keywords, query, 3);

    assert(products.length > 0, `Expected results for: ${query}`);
    assert(
      products.every((product) => product.subcategory === expectedType),
      `Expected only ${expectedType} results for: ${query}`
    );
    assert(
      [
        products[0].title,
        products[0].description,
        ...(products[0].ingredients || []),
        ...(products[0].tags || [])
      ]
        .join(" ")
        .toLowerCase()
        .includes(expectedText),
      `Expected top result to mention "${expectedText}" for: ${query}`
    );
  }

  console.log(`Passed ${cases.length} recommendation ranking checks.`);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
