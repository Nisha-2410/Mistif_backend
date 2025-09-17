const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function getProductIdFromUrl(url) {
  const match = url.match(/\/p\/(\d+)/);
  return match ? match[1] : null;
}

async function scrapeProductReviews(productUrl, limit = 50) {
  try {
    const productId = getProductIdFromUrl(productUrl);
    if (!productId) {
      console.warn(`⚠️ Could not extract productId from URL: ${productUrl}`);
      return [];
    }

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json",
    };

    let allReviews = [];
    let page = 1;

    while (allReviews.length < limit) {
      const apiUrl = `https://www.nykaa.com/gateway-api/products/${productId}/reviews?domain=nykaa&size=20&source=react&page=${page}`;
      const res = await fetch(apiUrl, { headers });

      if (!res.ok) {
        console.error(`🚨 Nykaa API error: ${res.status} ${res.statusText}`);
        break;
      }

      const data = await res.json();
      const reviewsObj = data?.response?.reviewData;

      if (!reviewsObj || Object.keys(reviewsObj).length === 0) break;

      allReviews.push(...Object.values(reviewsObj));
      page++;
      await new Promise(r => setTimeout(r, 500)); // polite delay
    }

    // Return only rating, title, review
    return allReviews
      .slice(0, limit)
      .map(r => ({
        rating: r.rating,
        title: r.title || "",
        review: r.description || "",
      }));
  } catch (err) {
    console.error("🚨 scrapeProductReviews error:", err.message);
    return [];
  }
}

module.exports = { scrapeProductReviews };



