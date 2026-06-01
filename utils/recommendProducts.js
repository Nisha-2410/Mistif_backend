function safeLower(value) {
  return String(value || "").toLowerCase();
}

function normalizeList(values) {
  return (values || []).map((value) => safeLower(value));
}

function parseBudget(priceText) {
  if (!priceText) return null;
  const normalized = safeLower(priceText).replace(/[, ]+/g, "");
  const underMatch = normalized.match(/under(\d+)/);
  if (underMatch) return { max: Number(underMatch[1]) };

  const rangeMatch = normalized.match(/(\d+)-(\d+)/);
  if (rangeMatch) return { min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) };

  if (normalized.includes("budget")) return { max: 700 };
  if (normalized.includes("premium")) return { min: 1000 };
  return null;
}

function keywordSetFromQuery(query) {
  return new Set(
    safeLower(query)
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2)
  );
}

function hasPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp(`\\b${escaped}\\b`).test(text);
}

function scoreBudget(productPrice, budget) {
  if (!budget) return 0;
  if (budget.max && productPrice <= budget.max) return 16;
  if (budget.min && productPrice >= budget.min && (!budget.max || productPrice <= budget.max)) return 12;
  if (budget.max && productPrice <= budget.max * 1.15) return 5;
  return -8;
}

function scoreProduct(product, keywords, queryTokens, queryText) {
  const attributes = normalizeList(keywords.attributes);
  const targetAudience = normalizeList(keywords.targetAudience);
  const ingredients = normalizeList(keywords.ingredients);
  const concerns = normalizeList(keywords.concerns);
  const budget = parseBudget(keywords.price);
  const haystack = [
    product.title,
    product.brand,
    product.description,
    ...(product.tags || []),
    ...(product.concerns || []),
    ...(product.ingredients || []),
    ...Object.values(product.specs || {})
  ]
    .map((value) => safeLower(value))
    .join(" ");

  let score = 40;
  const reasons = [];

  for (const concern of concerns) {
    if (haystack.includes(concern)) {
      score += 12;
      reasons.push(`targets ${concern}`);
    }
  }

  for (const ingredient of ingredients) {
    const explicitlyRequested = hasPhrase(queryText, ingredient);
    if (haystack.includes(ingredient)) {
      score += explicitlyRequested ? 30 : 10;
      reasons.push(`includes ${ingredient}`);
    } else if (explicitlyRequested) {
      score -= 30;
    }
  }

  for (const attribute of attributes) {
    if (haystack.includes(attribute)) {
      score += hasPhrase(queryText, attribute) ? 16 : 8;
      reasons.push(`matches ${attribute} preference`);
    } else if (hasPhrase(queryText, attribute)) {
      score -= 12;
    }
  }

  for (const audience of targetAudience) {
    if (haystack.includes(audience)) {
      score += 6;
      reasons.push(`fits ${audience}`);
    }
  }

  for (const token of queryTokens) {
    if (haystack.includes(token)) {
      score += 2;
    }
  }

  if (keywords.productType) {
    if (safeLower(product.subcategory).includes(safeLower(keywords.productType))) {
      score += 24;
      reasons.push(`is a strong ${keywords.productType} match`);
    } else {
      score -= 30;
    }
  }

  score += scoreBudget(product.price, budget);
  score += Math.min(12, Math.round(product.rating * 2));
  score += Math.min(8, Math.round(product.reviewCount / 1000));

  return {
    score: Math.max(0, Math.min(100, score)),
    rankScore: score,
    reasons: Array.from(new Set(reasons)).slice(0, 3)
  };
}

function buildWhyForYou(product, scoreData, keywords) {
  const productLabel = product.title.toLowerCase().startsWith(product.brand.toLowerCase())
    ? product.title
    : `${product.brand} ${product.title}`;
  const reasonLine = scoreData.reasons.length
    ? scoreData.reasons.join(", ")
    : "aligns with your needs based on category, benefits, and buyer feedback";

  const concernLine = (keywords.concerns || []).length
    ? `It especially lines up with concerns like ${(keywords.concerns || []).slice(0, 2).join(" and ")}.`
    : `Its review profile suggests it is a dependable fit for ${product.specs.skinType || "everyday use"}.`;

  return `${productLabel} stands out because it ${reasonLine}. ${concernLine}`;
}

function recommendProducts(products, keywords, query, limit = 6) {
  const queryTokens = keywordSetFromQuery(query);
  const queryText = safeLower(query);

  return products
    .map((product) => {
      const scoreData = scoreProduct(product, keywords, queryTokens, queryText);
      return {
        ...product,
        matchScore: scoreData.score,
        rankScore: scoreData.rankScore,
        matchReason: scoreData.reasons[0] || "Good overall fit for your request",
        whyForYou: buildWhyForYou(product, scoreData, keywords)
      };
    })
    .sort((a, b) => b.rankScore - a.rankScore || b.rating - a.rating)
    .slice(0, limit)
    .map(({ rankScore, ...product }) => product);
}

module.exports = { recommendProducts };
