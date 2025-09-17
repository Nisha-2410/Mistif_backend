const { HttpsProxyAgent } = require("https-proxy-agent");
// const fetch = require("node-fetch"); 

async function fetchRenderedHTML(url) {
  const username = process.env.BRIGHTDATA_USER; // lum-customer-xxx-zone-xxx
  const password = process.env.BRIGHTDATA_PASS; // your password or API key
  const proxy = `http://${username}:${password}@brd.superproxy.io:22225`;

  console.log(`🌐 Fetching via Web Unlocker: ${url}`);

  // Ignore only proxy SSL issues, not global
  const agent = new HttpsProxyAgent(proxy, {
    rejectUnauthorized: false
  });

  const res = await fetch(url, {
    method: "GET",
    agent,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });

  if (!res.ok) {
    throw new Error(`Bright Data fetch error: ${res.status} ${res.statusText}`);
  }

  return await res.text();
}

module.exports = { fetchRenderedHTML };





