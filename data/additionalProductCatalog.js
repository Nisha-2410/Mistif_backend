const images = {
  cleanser: "/product-images/cleanser.svg",
  moisturizer: "/product-images/moisturizer.svg",
  serum: "/product-images/serum.svg",
  sunscreen: "/product-images/sunscreen.svg",
  exfoliant: "/product-images/exfoliant.svg"
};

const profiles = {
  gentleCleanser: {
    skinType: "Dry, sensitive, combination",
    texture: "Gentle cleanser",
    ingredients: ["glycerin", "panthenol", "ceramides"],
    tags: ["gentle", "hydrating", "barrier-friendly", "daily use"],
    concerns: ["dryness", "sensitivity", "barrier repair", "redness"],
    description: "A gentle daily cleanser designed to remove impurities without leaving skin tight.",
    pros: ["Comfortable for daily cleansing", "Supports a calm skin barrier", "Easy to pair with active treatments"],
    cons: ["May feel too mild for heavy makeup", "Not ideal if you prefer a strong foaming cleanse"],
    reviewSummary: "A dependable everyday choice for people who want a comfortable cleanse without a stripped feeling."
  },
  acneCleanser: {
    skinType: "Oily, acne-prone, combination",
    texture: "Gel cleanser",
    ingredients: ["salicylic acid", "niacinamide", "zinc"],
    tags: ["acne control", "oil control", "pore care", "daily use"],
    concerns: ["acne", "blackheads", "oiliness", "pores"],
    description: "A clarifying cleanser aimed at excess oil, clogged pores, and breakout-prone skin.",
    pros: ["Helps keep pores clear", "Useful for oily routines", "Works well as a focused first step"],
    cons: ["Can feel drying if overused", "Dry or reactive skin should introduce it slowly"],
    reviewSummary: "Often chosen by oily-skin users looking for a practical cleanser that supports clearer-looking pores."
  },
  barrierMoisturizer: {
    skinType: "Dry, sensitive, combination",
    texture: "Barrier cream",
    ingredients: ["ceramides", "glycerin", "panthenol"],
    tags: ["barrier repair", "hydrating", "calming", "fragrance-free"],
    concerns: ["dryness", "barrier repair", "sensitivity", "redness"],
    description: "A barrier-supporting moisturizer for dry, stressed, or easily irritated skin.",
    pros: ["Helps reduce tightness", "Comforting after active treatments", "Supports dry and sensitive skin"],
    cons: ["May feel rich on very oily skin", "Can take a little time to absorb"],
    reviewSummary: "Users tend to reach for this style of moisturizer when skin feels dry, fragile, or overworked."
  },
  gelMoisturizer: {
    skinType: "Oily, combination, normal",
    texture: "Light gel cream",
    ingredients: ["hyaluronic acid", "niacinamide", "glycerin"],
    tags: ["lightweight", "hydrating", "non-greasy", "summer-friendly"],
    concerns: ["dehydration", "oiliness", "sticky creams", "dullness"],
    description: "A lightweight gel moisturizer that adds hydration while keeping the finish fresh.",
    pros: ["Layers easily under sunscreen", "Comfortable in warm weather", "Hydrates without heaviness"],
    cons: ["May not be rich enough for very dry skin", "Dry patches may need an extra cream"],
    reviewSummary: "A popular texture for combination and oily skin users who want hydration without a heavy finish."
  },
  niacinamideSerum: {
    skinType: "Oily, acne-prone, combination",
    texture: "Light serum",
    ingredients: ["niacinamide", "zinc"],
    tags: ["oil control", "pores", "post-acne marks", "brightening"],
    concerns: ["oiliness", "pores", "dark spots", "acne"],
    description: "An oil-balancing serum focused on visible pores, shine, and post-acne marks.",
    pros: ["Fits easily into oily-skin routines", "Supports a more balanced finish", "Useful for gradual mark care"],
    cons: ["Can irritate if layered with too many actives", "Visible results need consistent use"],
    reviewSummary: "Frequently used as a straightforward daily serum for shine, pores, and the appearance of leftover marks."
  },
  vitaminCSerum: {
    skinType: "Normal, combination, dull skin",
    texture: "Fluid serum",
    ingredients: ["vitamin c", "ferulic acid"],
    tags: ["brightening", "glow", "daytime serum", "uneven tone"],
    concerns: ["dullness", "pigmentation", "dark spots", "uneven tone"],
    description: "A brightening serum designed to support glow and more even-looking skin tone.",
    pros: ["Adds a fresh glow over time", "Useful in daytime routines", "Pairs well with daily sunscreen"],
    cons: ["Can tingle on sensitive skin", "Needs consistent storage and sunscreen use"],
    reviewSummary: "Often picked by users who want a brighter, fresher look and gradual support for uneven tone."
  },
  hydratingSerum: {
    skinType: "Dry, sensitive, combination",
    texture: "Hydrating essence serum",
    ingredients: ["hyaluronic acid", "panthenol", "glycerin"],
    tags: ["hydrating", "plumping", "barrier support", "layering serum"],
    concerns: ["dehydration", "dryness", "barrier repair", "dullness"],
    description: "A hydration-first serum for skin that feels tight, flat, or in need of extra comfort.",
    pros: ["Easy to layer with other products", "Helps skin feel more comfortable", "Suitable for simple routines"],
    cons: ["Needs a moisturizer on top", "May feel sticky if too much is applied"],
    reviewSummary: "A useful layering step for people whose skin needs more water-based hydration and everyday comfort."
  },
  pigmentSerum: {
    skinType: "Normal, combination, oily",
    texture: "Treatment serum",
    ingredients: ["alpha arbutin", "niacinamide", "tranexamic acid"],
    tags: ["pigmentation", "acne marks", "brightening", "uneven tone"],
    concerns: ["dark spots", "pigmentation", "uneven tone", "post-acne marks"],
    description: "A targeted serum for the appearance of post-acne marks and uneven-looking tone.",
    pros: ["Focused on gradual mark care", "Easy to add to a simple routine", "Useful for uneven tone"],
    cons: ["Results require patience", "Daily sunscreen is important"],
    reviewSummary: "Typically selected by users looking for a steady, approachable treatment for marks and uneven tone."
  },
  calmingSerum: {
    skinType: "Sensitive, dry, combination",
    texture: "Soothing serum",
    ingredients: ["cica", "panthenol", "madecassoside"],
    tags: ["calming", "barrier support", "redness", "sensitive skin"],
    concerns: ["redness", "sensitivity", "barrier repair", "dehydration"],
    description: "A soothing serum for skin that feels reactive, flushed, or easily stressed.",
    pros: ["Comfortable during sensitive-skin phases", "Supports a calmer-looking complexion", "Layers well with basic moisturizers"],
    cons: ["Not a strong treatment for stubborn concerns", "May feel too simple for active-focused routines"],
    reviewSummary: "A gentle support serum often favored when the goal is calm, comfortable, less reactive-looking skin."
  },
  retinolSerum: {
    skinType: "Normal, combination, experienced users",
    texture: "Night treatment serum",
    ingredients: ["retinol", "squalane"],
    tags: ["night routine", "fine lines", "texture", "renewal"],
    concerns: ["fine lines", "aging", "texture", "dullness"],
    description: "A night treatment aimed at smoother-looking texture and early signs of aging.",
    pros: ["Supports smoother-looking skin over time", "Useful for a gradual night routine", "Targets texture and fine lines"],
    cons: ["Must be introduced slowly", "Can cause dryness and requires daytime sunscreen"],
    reviewSummary: "Usually chosen by users ready to introduce a measured night treatment for texture and early fine lines."
  },
  matteSunscreen: {
    skinType: "Oily, acne-prone, combination",
    texture: "Matte sunscreen gel",
    ingredients: ["uv filters", "vitamin e"],
    tags: ["sun protection", "matte finish", "oil control", "humid weather"],
    concerns: ["sun protection", "oiliness", "sweating", "pigmentation"],
    description: "A daily sunscreen with a lighter, matte-leaning finish for oily and combination skin.",
    pros: ["Comfortable in humid weather", "Helps avoid a greasy finish", "Works well for oily routines"],
    cons: ["May feel too dry on flaky skin", "Texture may not suit every moisturizer"],
    reviewSummary: "Commonly selected by oily-skin users who want daily protection with a less shiny finish."
  },
  hydratingSunscreen: {
    skinType: "Dry, normal, combination",
    texture: "Hydrating sunscreen lotion",
    ingredients: ["uv filters", "hyaluronic acid", "niacinamide"],
    tags: ["sun protection", "hydrating", "daily sunscreen", "no cast"],
    concerns: ["sun protection", "dehydration", "dryness", "pigmentation"],
    description: "A comfortable daily sunscreen lotion that combines hydration with an easy-wearing finish.",
    pros: ["Comfortable for everyday use", "Layers smoothly over moisturizer", "Suits normal and dry skin"],
    cons: ["Can look dewy on oily skin", "May feel rich in very humid weather"],
    reviewSummary: "Favored by users who want sunscreen to feel closer to a lightweight moisturizer than a dry gel."
  },
  bhaExfoliant: {
    skinType: "Oily, acne-prone, combination",
    texture: "Leave-on liquid exfoliant",
    ingredients: ["salicylic acid", "green tea"],
    tags: ["blackheads", "pores", "texture", "exfoliation"],
    concerns: ["blackheads", "pores", "acne", "uneven texture"],
    description: "A leave-on BHA exfoliant for visible congestion, rough texture, and clogged pores.",
    pros: ["Useful for blackhead-prone skin", "Supports smoother-looking texture", "Easy to use a few nights each week"],
    cons: ["Can irritate if overused", "Needs careful layering with other active products"],
    reviewSummary: "A focused option for users trying to improve congestion and texture while keeping exfoliation measured."
  },
  ahaExfoliant: {
    skinType: "Normal, dry, combination",
    texture: "Exfoliating toner",
    ingredients: ["lactic acid", "glycolic acid"],
    tags: ["glow", "texture", "exfoliation", "uneven tone"],
    concerns: ["dullness", "uneven texture", "pigmentation", "dryness"],
    description: "An AHA exfoliating treatment for dullness, uneven texture, and a fresher-looking finish.",
    pros: ["Supports a brighter look", "Helps smooth rough texture", "Useful as an occasional night treatment"],
    cons: ["May sting reactive skin", "Requires sunscreen and a gradual schedule"],
    reviewSummary: "Often used once or twice weekly by people who want smoother texture and a more polished glow."
  }
};

const productSeeds = [
  ["Cetaphil Oily Skin Cleanser", "Cetaphil", 645, 720, "cleanser", "acneCleanser", "125ml", 4.2, 1830],
  ["CeraVe Foaming Cleanser", "CeraVe", 1120, 1299, "cleanser", "acneCleanser", "236ml", 4.5, 3260],
  ["CeraVe Hydrating Cleanser", "CeraVe", 1150, 1320, "cleanser", "gentleCleanser", "236ml", 4.6, 2790],
  ["Simple Kind To Skin Refreshing Facial Wash", "Simple", 385, 450, "cleanser", "gentleCleanser", "150ml", 4.3, 2120],
  ["Minimalist Aquaporin Booster Cleanser", "Minimalist", 299, 349, "cleanser", "gentleCleanser", "100ml", 4.2, 1480],
  ["Minimalist Salicylic + LHA Cleanser", "Minimalist", 299, 349, "cleanser", "acneCleanser", "100ml", 4.3, 2380],
  ["The Derma Co 1% Salicylic Acid Gel Face Wash", "The Derma Co", 299, 349, "cleanser", "acneCleanser", "100ml", 4.1, 1980],
  ["Bioderma Sebium Gel Moussant", "Bioderma", 699, 799, "cleanser", "acneCleanser", "100ml", 4.4, 1120],
  ["Bioderma Atoderm Intensive Gel Moussant", "Bioderma", 799, 899, "cleanser", "gentleCleanser", "200ml", 4.5, 890],
  ["COSRX Salicylic Acid Daily Gentle Cleanser", "COSRX", 850, 990, "cleanser", "acneCleanser", "150ml", 4.3, 1730],
  ["Beauty of Joseon Green Plum Refreshing Cleanser", "Beauty of Joseon", 1080, 1250, "cleanser", "gentleCleanser", "100ml", 4.5, 1260],
  ["Round Lab 1025 Dokdo Cleanser", "Round Lab", 1250, 1450, "cleanser", "gentleCleanser", "150ml", 4.6, 940],
  ["Plum Green Tea Pore Cleansing Face Wash", "Plum", 345, 425, "cleanser", "acneCleanser", "100ml", 4.1, 1840],
  ["Dot & Key Barrier Repair Gentle Face Wash", "Dot & Key", 295, 395, "cleanser", "gentleCleanser", "100ml", 4.2, 1370],
  ["Re'equil Oil Control Face Wash", "Re'equil", 395, 450, "cleanser", "acneCleanser", "200ml", 4.2, 1190],
  ["Neutrogena Deep Clean Facial Cleanser", "Neutrogena", 425, 499, "cleanser", "acneCleanser", "200ml", 4.2, 2260],
  ["Avene Cleanance Cleansing Gel", "Avene", 1190, 1350, "cleanser", "acneCleanser", "100ml", 4.4, 760],
  ["Isntree Yam Root Vegan Milk Cleanser", "Isntree", 1390, 1550, "cleanser", "gentleCleanser", "220ml", 4.6, 610],
  ["Deconstruct Hydrating Face Wash", "Deconstruct", 299, 349, "cleanser", "gentleCleanser", "100ml", 4.2, 920],
  ["Foxtale The Daily Duet Hydrating Cleanser", "Foxtale", 349, 399, "cleanser", "gentleCleanser", "100ml", 4.3, 1080],

  ["Cetaphil Moisturising Lotion", "Cetaphil", 699, 799, "moisturizer", "barrierMoisturizer", "100ml", 4.4, 2840],
  ["CeraVe Facial Moisturising Lotion", "CeraVe", 1450, 1650, "moisturizer", "barrierMoisturizer", "52ml", 4.5, 1840],
  ["Simple Kind To Skin Replenishing Rich Moisturiser", "Simple", 475, 550, "moisturizer", "barrierMoisturizer", "125ml", 4.3, 1670],
  ["Minimalist Sepicalm 3% Moisturizer", "Minimalist", 349, 399, "moisturizer", "barrierMoisturizer", "50g", 4.2, 2120],
  ["Minimalist Vitamin B5 10% Moisturizer", "Minimalist", 349, 399, "moisturizer", "gelMoisturizer", "50g", 4.3, 2260],
  ["Re'equil Ceramide & Hyaluronic Acid Moisturiser", "Re'equil", 395, 495, "moisturizer", "barrierMoisturizer", "100g", 4.4, 2370],
  ["Re'equil Oil Free Moisturiser", "Re'equil", 350, 450, "moisturizer", "gelMoisturizer", "100g", 4.2, 1930],
  ["Dot & Key 72HR Hydrating Gel", "Dot & Key", 495, 595, "moisturizer", "gelMoisturizer", "60ml", 4.2, 1740],
  ["Plum Green Tea Oil Free Moisturizer", "Plum", 470, 575, "moisturizer", "gelMoisturizer", "50ml", 4.1, 2180],
  ["COSRX Oil-Free Ultra-Moisturizing Lotion", "COSRX", 1450, 1650, "moisturizer", "gelMoisturizer", "100ml", 4.5, 1590],
  ["COSRX Balancium Comfort Ceramide Cream", "COSRX", 1690, 1850, "moisturizer", "barrierMoisturizer", "80g", 4.5, 920],
  ["Beauty of Joseon Dynasty Cream", "Beauty of Joseon", 1650, 1850, "moisturizer", "barrierMoisturizer", "50ml", 4.5, 1330],
  ["Bioderma Sebium Hydra Moisturiser", "Bioderma", 1099, 1250, "moisturizer", "gelMoisturizer", "40ml", 4.4, 810],
  ["Avene Tolerance Control Soothing Skin Recovery Cream", "Avene", 1650, 1850, "moisturizer", "barrierMoisturizer", "40ml", 4.6, 680],
  ["Isntree Hyaluronic Acid Aqua Gel Cream", "Isntree", 1390, 1550, "moisturizer", "gelMoisturizer", "100ml", 4.5, 970],
  ["Neutrogena Oil-Free Moisture Combination Skin", "Neutrogena", 625, 725, "moisturizer", "gelMoisturizer", "118ml", 4.2, 1480],
  ["The Derma Co Oil-Free Daily Face Moisturizer", "The Derma Co", 349, 399, "moisturizer", "gelMoisturizer", "50g", 4.1, 1290],
  ["Deconstruct Skin Soothe Moisturizer", "Deconstruct", 349, 399, "moisturizer", "barrierMoisturizer", "50g", 4.2, 840],
  ["Foxtale Ceramide Supercream", "Foxtale", 445, 545, "moisturizer", "barrierMoisturizer", "50ml", 4.3, 1160],
  ["Dr. Sheth's Ceramide & Vitamin C Oil-Free Moisturizer", "Dr. Sheth's", 349, 399, "moisturizer", "gelMoisturizer", "50g", 4.2, 1710],

  ["Minimalist Niacinamide 5% Face Serum", "Minimalist", 599, 649, "serum", "niacinamideSerum", "30ml", 4.4, 2860],
  ["Minimalist Vitamin C 10% Face Serum", "Minimalist", 699, 749, "serum", "vitaminCSerum", "30ml", 4.3, 2390],
  ["Minimalist Alpha Arbutin 2% Face Serum", "Minimalist", 549, 599, "serum", "pigmentSerum", "30ml", 4.3, 1770],
  ["Minimalist Hyaluronic Acid 2% Face Serum", "Minimalist", 599, 649, "serum", "hydratingSerum", "30ml", 4.3, 1950],
  ["Minimalist Retinol 0.3% Face Serum", "Minimalist", 599, 699, "serum", "retinolSerum", "30ml", 4.2, 1260],
  ["The Ordinary Hyaluronic Acid 2% + B5", "The Ordinary", 750, 850, "serum", "hydratingSerum", "30ml", 4.5, 3120],
  ["The Ordinary Alpha Arbutin 2% + HA", "The Ordinary", 950, 1050, "serum", "pigmentSerum", "30ml", 4.4, 1660],
  ["The Ordinary Retinol 0.2% in Squalane", "The Ordinary", 850, 950, "serum", "retinolSerum", "30ml", 4.3, 1450],
  ["Plum 10% Niacinamide Face Serum", "Plum", 599, 790, "serum", "niacinamideSerum", "30ml", 4.2, 2420],
  ["Plum 2% Hyaluronic Acid Serum", "Plum", 490, 650, "serum", "hydratingSerum", "30ml", 4.1, 1190],
  ["The Derma Co 2% Kojic Acid Face Serum", "The Derma Co", 499, 599, "serum", "pigmentSerum", "30ml", 4.2, 1980],
  ["The Derma Co 10% Vitamin C Face Serum", "The Derma Co", 499, 599, "serum", "vitaminCSerum", "30ml", 4.1, 2070],
  ["Deconstruct 10% Vitamin C + Ferulic Acid Serum", "Deconstruct", 699, 799, "serum", "vitaminCSerum", "30ml", 4.3, 1210],
  ["Deconstruct 5% Niacinamide + 2% Alpha Arbutin Serum", "Deconstruct", 599, 699, "serum", "pigmentSerum", "30ml", 4.3, 1080],
  ["Beauty of Joseon Glow Serum Propolis + Niacinamide", "Beauty of Joseon", 1350, 1499, "serum", "niacinamideSerum", "30ml", 4.6, 2640],
  ["Beauty of Joseon Calming Serum Green Tea + Panthenol", "Beauty of Joseon", 1350, 1499, "serum", "calmingSerum", "30ml", 4.5, 1480],
  ["COSRX The Hyaluronic Acid 3 Serum", "COSRX", 1590, 1790, "serum", "hydratingSerum", "20ml", 4.5, 970],
  ["COSRX The Niacinamide 15 Serum", "COSRX", 1590, 1790, "serum", "niacinamideSerum", "20ml", 4.4, 1180],
  ["Isntree Hyaluronic Acid Water Essence", "Isntree", 1550, 1750, "serum", "hydratingSerum", "50ml", 4.6, 1390],
  ["Purito Centella Unscented Serum", "Purito", 1490, 1690, "serum", "calmingSerum", "60ml", 4.6, 1870],
  ["Klairs Freshly Juiced Vitamin Drop", "Klairs", 1570, 1750, "serum", "vitaminCSerum", "35ml", 4.5, 2050],
  ["Foxtale Vitamin C Serum", "Foxtale", 595, 695, "serum", "vitaminCSerum", "30ml", 4.2, 1360],
  ["Foxtale Retinol Night Serum", "Foxtale", 695, 795, "serum", "retinolSerum", "30ml", 4.2, 890],
  ["Dot & Key Cica Calming Skin Renewing Serum", "Dot & Key", 595, 695, "serum", "calmingSerum", "30ml", 4.2, 1260],
  ["Dr. Sheth's Centella & Niacinamide Serum", "Dr. Sheth's", 549, 599, "serum", "calmingSerum", "30ml", 4.3, 1120],

  ["Minimalist Light Fluid SPF 50 Sunscreen", "Minimalist", 399, 499, "sunscreen", "matteSunscreen", "50ml", 4.3, 2490],
  ["Minimalist Invisible SPF 40 Sunscreen", "Minimalist", 499, 599, "sunscreen", "matteSunscreen", "50g", 4.2, 1760],
  ["The Derma Co 1% Hyaluronic Sunscreen Aqua Gel SPF 50", "The Derma Co", 499, 599, "sunscreen", "hydratingSunscreen", "50g", 4.3, 3620],
  ["Dot & Key Watermelon Cooling Sunscreen SPF 50", "Dot & Key", 495, 595, "sunscreen", "hydratingSunscreen", "50g", 4.2, 2290],
  ["Dot & Key Cica Calming Niacinamide Sunscreen SPF 50", "Dot & Key", 495, 595, "sunscreen", "matteSunscreen", "50g", 4.2, 1480],
  ["Dr. Sheth's Ceramide & Vitamin C Sunscreen SPF 50", "Dr. Sheth's", 499, 599, "sunscreen", "hydratingSunscreen", "50g", 4.3, 3180],
  ["Plum Green Tea & Zinc Super-Matte Sunscreen SPF 50", "Plum", 499, 599, "sunscreen", "matteSunscreen", "50g", 4.1, 1630],
  ["Aqualogica Glow+ Dewy Sunscreen SPF 50", "Aqualogica", 449, 599, "sunscreen", "hydratingSunscreen", "50g", 4.2, 2890],
  ["Aqualogica Radiance+ Dewy Sunscreen SPF 50", "Aqualogica", 449, 599, "sunscreen", "hydratingSunscreen", "50g", 4.2, 2140],
  ["Foxtale Matte Finish Sunscreen SPF 70", "Foxtale", 595, 695, "sunscreen", "matteSunscreen", "50ml", 4.2, 1060],
  ["Re'equil Oxybenzone & OMC Free Sunscreen SPF 50", "Re'equil", 550, 650, "sunscreen", "hydratingSunscreen", "50g", 4.3, 1860],
  ["Fixderma Shadow SPF 30+ Gel", "Fixderma", 335, 395, "sunscreen", "matteSunscreen", "75g", 4.1, 1570],
  ["Neutrogena Ultra Sheer Dry Touch Sunblock SPF 50+", "Neutrogena", 650, 750, "sunscreen", "matteSunscreen", "88ml", 4.2, 4380],
  ["Bioderma Photoderm Aquafluide SPF 50+", "Bioderma", 1499, 1699, "sunscreen", "matteSunscreen", "40ml", 4.4, 780],
  ["Avene Very High Protection Fluid SPF 50+", "Avene", 1650, 1850, "sunscreen", "hydratingSunscreen", "50ml", 4.5, 720],
  ["COSRX Aloe Soothing Sun Cream SPF 50+", "COSRX", 1050, 1190, "sunscreen", "hydratingSunscreen", "50ml", 4.4, 2480],
  ["Purito Daily Go-To Sunscreen SPF 50+", "Purito", 1450, 1650, "sunscreen", "hydratingSunscreen", "60ml", 4.5, 1360],
  ["Skin1004 Hyalu-Cica Water-Fit Sun Serum SPF 50+", "Skin1004", 1490, 1690, "sunscreen", "hydratingSunscreen", "50ml", 4.7, 2250],
  ["Conscious Chemist Sun Drink Hybrid Gel SPF 50", "Conscious Chemist", 499, 599, "sunscreen", "matteSunscreen", "50ml", 4.2, 990],
  ["Deconstruct Lightweight Gel Sunscreen SPF 55+", "Deconstruct", 349, 399, "sunscreen", "matteSunscreen", "50g", 4.2, 1190],

  ["Minimalist 2% Salicylic Acid Serum", "Minimalist", 549, 599, "exfoliant", "bhaExfoliant", "30ml", 4.3, 2730],
  ["Minimalist AHA 25% + PHA 5% + BHA 2% Peel", "Minimalist", 699, 749, "exfoliant", "ahaExfoliant", "30ml", 4.2, 1640],
  ["The Ordinary Glycolic Acid 7% Toning Solution", "The Ordinary", 1250, 1399, "exfoliant", "ahaExfoliant", "240ml", 4.5, 3260],
  ["The Ordinary Lactic Acid 5% + HA", "The Ordinary", 950, 1050, "exfoliant", "ahaExfoliant", "30ml", 4.4, 1540],
  ["The Ordinary Salicylic Acid 2% Solution", "The Ordinary", 850, 950, "exfoliant", "bhaExfoliant", "30ml", 4.4, 1890],
  ["COSRX BHA Blackhead Power Liquid", "COSRX", 1490, 1650, "exfoliant", "bhaExfoliant", "100ml", 4.5, 2380],
  ["COSRX AHA 7 Whitehead Power Liquid", "COSRX", 1490, 1650, "exfoliant", "ahaExfoliant", "100ml", 4.4, 1690],
  ["Beauty of Joseon Green Plum Refreshing Toner AHA + BHA", "Beauty of Joseon", 1350, 1499, "exfoliant", "ahaExfoliant", "150ml", 4.4, 860],
  ["Isntree Chestnut BHA 2% Clear Liquid", "Isntree", 1590, 1790, "exfoliant", "bhaExfoliant", "100ml", 4.5, 740],
  ["Deconstruct Exfoliating Serum 18% AHA + 2% BHA", "Deconstruct", 699, 799, "exfoliant", "ahaExfoliant", "30ml", 4.2, 970],
  ["Plum Green Tea Alcohol-Free Toner", "Plum", 390, 490, "exfoliant", "bhaExfoliant", "200ml", 4.1, 1810],
  ["The Derma Co 2% Salicylic Acid Face Serum", "The Derma Co", 499, 599, "exfoliant", "bhaExfoliant", "30ml", 4.2, 2590],
  ["Dot & Key Watermelon Superglow Pore Tightening Toner", "Dot & Key", 395, 495, "exfoliant", "ahaExfoliant", "150ml", 4.1, 1180],
  ["Pixi Glow Tonic", "Pixi", 1450, 1650, "exfoliant", "ahaExfoliant", "100ml", 4.4, 1430],
  ["Klairs Gentle Black Sugar Facial Polish", "Klairs", 1350, 1499, "exfoliant", "ahaExfoliant", "110g", 4.3, 880]
];

const titleIngredientMap = [
  ["alpha arbutin", "alpha arbutin"],
  ["salicylic acid", "salicylic acid"],
  ["hyaluronic acid", "hyaluronic acid"],
  ["niacinamide", "niacinamide"],
  ["ceramide", "ceramides"],
  ["vitamin c", "vitamin c"],
  ["vitamin b5", "panthenol"],
  ["retinol", "retinol"],
  ["cica", "cica"],
  ["centella", "cica"],
  ["bha", "bha"],
  ["aha", "aha"],
  ["pha", "pha"]
];

function getTitleIngredients(title, fallbackIngredients) {
  const normalizedTitle = title.toLowerCase();
  const titleIngredients = titleIngredientMap
    .filter(([phrase]) => normalizedTitle.includes(phrase))
    .map(([, ingredient]) => ingredient);
  return Array.from(new Set([...titleIngredients, ...fallbackIngredients]));
}

const additionalProductCatalog = productSeeds.map(
  ([title, brand, price, originalPrice, subcategory, profileName, volume, rating, reviewCount], index) => {
    const profile = profiles[profileName];
    const ingredients = getTitleIngredients(title, profile.ingredients);
    return {
      id: `skincare-${index + 25}`,
      title,
      brand,
      price,
      originalPrice,
      image: images[subcategory],
      rating,
      reviewCount,
      category: "skincare",
      subcategory,
      description: profile.description,
      specs: {
        skinType: profile.skinType,
        volume,
        texture: profile.texture,
        keyIngredients: ingredients.join(", ")
      },
      tags: [...profile.tags],
      concerns: [...profile.concerns],
      ingredients,
      pros: [...profile.pros],
      cons: [...profile.cons],
      reviewSummary: profile.reviewSummary
    };
  }
);

module.exports = { additionalProductCatalog };
