export interface FoodProduct {
  id: string;
  name: string;
  hindiName: string;
  category: 'Fruit' | 'Vegetable' | 'Processed' | 'Leafy';
  respirationRate: 'Low' | 'Medium' | 'High' | 'Very High';
  ethyleneSensitivity: 'Low' | 'Moderate' | 'High' | 'Extreme';
  optimalTemp: string;
  optimalRH: string;
  typicalSpoilageRisks: string[];
  recommendedBarrier: {
    otr: string; // Oxygen Transmission Rate
    wvtr: string; // Water Vapor Transmission Rate
    thickness: string;
    atmosphere: string;
  };
  image: string;
  icon: string;
}

export interface Material {
  id: string;
  name: string;
  code: string;
  type: 'Polymer' | 'Bio-plastic' | 'Paperboard' | 'Pulp' | 'Composite';
  barrierScore: number; // 1-100
  sustainabilityScore: number; // 1-100
  costRating: '₹' | '₹₹' | '₹₹₹';
  avgPricePerKg: number;
  recyclability: string;
  suitableFoods: string[];
  keyStrengths: string[];
}

export interface PackagingStructure {
  id: string;
  title: string;
  structure: string;
  typicalUse: string;
  sealability: string;
  otrRange: string;
  wvtrRange: string;
  thicknessMicrons: string;
  costEstimatePerUnit: string;
  sustainabilityNote: string;
  carbonFootprint: string;
}

export interface Supplier {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  verified: boolean;
  location: string;
  state: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  yearsActive: number;
  materialsOffered: string[];
  capabilities: string[];
  minOrderQuantityKg: number;
  typicalLeadTimeDays: number;
  certifications: string[];
  basePricePerKg: number;
  productionCapacityTons: number;
  phone: string;
  email: string;
  matchScore: number; // calculated for demo
  scoringFactors: {
    technicalFit: number;
    cost: number;
    availability: number;
    manufacturing: number;
    sustainability: number;
    supplyChain: number;
  };
  strengths: string[];
  badges: string[];
}

export interface ProjectOption {
  id: 'option-balanced' | 'option-cost' | 'option-sustain';
  name: string;
  tagline: string;
  badge: string;
  material: string;
  structure: string;
  estimatedShelfLifeDays: number;
  costPerPackage: number;
  moqUnits: number;
  availabilityScore: number; // 1-100
  sustainabilityScore: number; // 1-100
  costScore: number; // 1-100
  technicalFitScore: number; // 1-100
  leadTimeDays: number;
  whyChoose: string;
  tradeoffs: string;
}

export interface Project {
  id: string;
  title: string;
  foodId: string;
  foodName: string;
  foodCategory: string;
  quantity: number;
  unit: string;
  targetShelfLifeDays: number;
  journeyStages: string[];
  temperatureCondition: string;
  humidityLevel: 'Dry' | 'Normal' | 'Humid';
  transportDurationHours: number;
  distanceKm: number;
  storageType: string;
  reportedProblems: string[];
  priorities: string[];
  currentPackaging: string;
  createdAt: string;
  status: 'DRAFT' | 'ANALYSIS' | 'BLUEPRINT' | 'SUPPLIER_MATCH' | 'QUOTES_PENDING' | 'QUOTES_RECEIVED' | 'ORDER_PLACED' | 'DISPATCHED' | 'IMPLEMENTED' | 'EVALUATED';
  selectedOptionId?: 'option-balanced' | 'option-cost' | 'option-sustain';
  selectedSupplierId?: string;
  selectedQuoteId?: string;
  orderTimeline?: {
    step: 'recommendation' | 'supplier_selected' | 'quote_accepted' | 'production' | 'dispatched' | 'implemented' | 'performance';
    updatedAt: string;
    expectedDelivery: string;
    actualDelivery?: string;
    courier?: string;
    trackingNumber?: string;
  };
  performanceData?: {
    targetShelfLife: number;
    actualShelfLifeAchieved: number;
    spoilageRateBefore: number;
    spoilageRateAfter: number;
    damagePercentage: number;
    satisfactionRating: number;
    packagingFailures: string[];
    userNotes: string;
    submittedAt: string;
    verifiedAchieved: boolean;
  };
}

export interface RFQ {
  id: string;
  projectId: string;
  supplierId: string;
  producerName: string;
  productName: string;
  quantityKg: number;
  targetShelfLifeDays: number;
  structureRequested: string;
  deliveryLocation: string;
  requiredByDate: string;
  notes: string;
  status: 'SENT' | 'REVIEWED' | 'QUOTE_RECEIVED' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
}

export interface Quote {
  id: string;
  rfqId: string;
  projectId: string;
  supplierId: string;
  supplierName: string;
  supplierLocation: string;
  pricePerPackage: number;
  totalCost: number;
  moq: number;
  leadTimeDays: number;
  structureOffered: string;
  thickness: string;
  sampleAvailable: boolean;
  validityDays: number;
  notes: string;
  isBestValue: boolean;
  technicalMatch: number;
  sustainabilityRating: string;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: 'producer' | 'supplier';
  text: string;
  timestamp: string;
  hasQuoteCard?: boolean;
  quoteData?: {
    quoteId: string;
    price: number;
    moq: number;
    leadTime: string;
  };
  hasRequirementCard?: boolean;
  requirementData?: {
    food: string;
    qty: string;
    structure: string;
  };
}

export interface ChatThread {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierLogo: string;
  projectId: string;
  projectTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  onlineStatus: boolean;
}

// -------------------------------------------------------------
// 10+ FOOD PRODUCTS
// -------------------------------------------------------------
export const MOCK_FOODS: FoodProduct[] = [
  {
    id: 'food-banana',
    name: 'Banana (Cavendish / Robusta)',
    hindiName: 'केला (केवेंडिश / रोबस्टा)',
    category: 'Fruit',
    respirationRate: 'High',
    ethyleneSensitivity: 'Extreme',
    optimalTemp: '13°C - 15°C',
    optimalRH: '85% - 90%',
    typicalSpoilageRisks: ['Rapid ripening from ethylene auto-catalysis', 'Mechanical crown bruising', 'Moisture condensation / Black mould'],
    recommendedBarrier: {
      otr: '45 - 65 cc/m²/day',
      wvtr: '12 - 18 g/m²/day',
      thickness: '40 - 55 µm',
      atmosphere: 'Active Modified Atmosphere (3% O₂, 5% CO₂, balance N₂)',
    },
    image: '🍌',
    icon: 'banana',
  },
  {
    id: 'food-tomato',
    name: 'Tomato (Roma / Hybrid)',
    hindiName: 'टमाटर (हाइब्रिड)',
    category: 'Vegetable',
    respirationRate: 'Medium',
    ethyleneSensitivity: 'Moderate',
    optimalTemp: '10°C - 12°C',
    optimalRH: '90% - 95%',
    typicalSpoilageRisks: ['Puncture leaks during transport', 'Alternaria rot from high humidity', 'Excessive softening & cracking'],
    recommendedBarrier: {
      otr: '80 - 120 cc/m²/day',
      wvtr: '20 - 30 g/m²/day',
      thickness: '30 - 45 µm',
      atmosphere: 'Macro-perforated breathable film',
    },
    image: '🍅',
    icon: 'tomato',
  },
  {
    id: 'food-mango',
    name: 'Alphonso Mango',
    hindiName: 'हापुस आम',
    category: 'Fruit',
    respirationRate: 'High',
    ethyleneSensitivity: 'High',
    optimalTemp: '12°C - 14°C',
    optimalRH: '85% - 90%',
    typicalSpoilageRisks: ['Anthracnose stem-end rot', 'Sap leakage burn', 'Spongy tissue breakdown'],
    recommendedBarrier: {
      otr: '50 - 70 cc/m²/day',
      wvtr: '15 - 22 g/m²/day',
      thickness: '45 - 60 µm',
      atmosphere: 'Anti-fog ethylene scavenger micro-film',
    },
    image: '🥭',
    icon: 'mango',
  },
  {
    id: 'food-potato',
    name: 'Potato (Table & Processing)',
    hindiName: 'आलू',
    category: 'Vegetable',
    respirationRate: 'Low',
    ethyleneSensitivity: 'Moderate',
    optimalTemp: '8°C - 10°C',
    optimalRH: '85% - 90%',
    typicalSpoilageRisks: ['Greening / toxic solanine synthesis under light', 'Premature sprouting', 'Soft bacterial rot'],
    recommendedBarrier: {
      otr: '150 - 250 cc/m²/day',
      wvtr: '40 - 60 g/m²/day',
      thickness: '50 - 70 µm',
      atmosphere: 'Light-blocking ventilated brown paper / dark mesh',
    },
    image: '🥔',
    icon: 'potato',
  },
  {
    id: 'food-onion',
    name: 'Red Onion (Nasik Premium)',
    hindiName: 'लाल प्याज (नासिक)',
    category: 'Vegetable',
    respirationRate: 'Low',
    ethyleneSensitivity: 'Low',
    optimalTemp: 'Ambient Dry (22°C - 28°C)',
    optimalRH: '65% - 70%',
    typicalSpoilageRisks: ['Neck rot fungus from humidity buildup', 'Sprouting when damp', 'Black Aspergillus mould'],
    recommendedBarrier: {
      otr: 'High (>300 cc/m²/day)',
      wvtr: 'High Breathability',
      thickness: 'Lenomesh / Woven',
      atmosphere: 'High ventilation open weave mesh',
    },
    image: '🧅',
    icon: 'onion',
  },
  {
    id: 'food-strawberry',
    name: 'Strawberry (Winter Dawn)',
    hindiName: 'स्ट्रॉबेरी',
    category: 'Fruit',
    respirationRate: 'Very High',
    ethyleneSensitivity: 'Low',
    optimalTemp: '0°C - 2°C',
    optimalRH: '90% - 95%',
    typicalSpoilageRisks: ['Gray mould (Botrytis cinerea)', 'Capillary crushing under self weight', 'Rapid moisture dehydration'],
    recommendedBarrier: {
      otr: '100 - 150 cc/m²/day',
      wvtr: '18 - 25 g/m²/day',
      thickness: 'Punnet 300µm + 25µm film',
      atmosphere: 'High CO₂ atmosphere (10-15%) with anti-fog PET',
    },
    image: '🍓',
    icon: 'strawberry',
  },
  {
    id: 'food-apple',
    name: 'Royal Delicious Apple (Himachal)',
    hindiName: 'सेब (हिमाचली)',
    category: 'Fruit',
    respirationRate: 'Low',
    ethyleneSensitivity: 'High',
    optimalTemp: '1°C - 4°C',
    optimalRH: '90% - 92%',
    typicalSpoilageRisks: ['Superficial scald', 'Compression bruising in crates', 'Skin shriveling'],
    recommendedBarrier: {
      otr: '60 - 90 cc/m²/day',
      wvtr: '15 - 20 g/m²/day',
      thickness: '5-Ply Corrugated Tray',
      atmosphere: 'Ventilated CFB with molded pulp divider trays',
    },
    image: '🍎',
    icon: 'apple',
  },
  {
    id: 'food-grapes',
    name: 'Thompson Seedless Grapes',
    hindiName: 'अंगूर (थॉम्पसन)',
    category: 'Fruit',
    respirationRate: 'Medium',
    ethyleneSensitivity: 'Low',
    optimalTemp: '-0.5°C - 0°C',
    optimalRH: '90% - 95%',
    typicalSpoilageRisks: ['Rachis browning', 'Berry shatter during vibration', 'Blue/Gray fungal rot'],
    recommendedBarrier: {
      otr: '70 - 100 cc/m²/day',
      wvtr: '12 - 16 g/m²/day',
      thickness: '35 - 50 µm',
      atmosphere: 'SO₂ dual-release pad + perforated LDPE pouch',
    },
    image: '🍇',
    icon: 'grapes',
  },
  {
    id: 'food-guava',
    name: 'Allahabad Guava (Safeda)',
    hindiName: 'अमरूद (इलाहाबादी सफेदा)',
    category: 'Fruit',
    respirationRate: 'High',
    ethyleneSensitivity: 'High',
    optimalTemp: '8°C - 10°C',
    optimalRH: '85% - 90%',
    typicalSpoilageRisks: ['Rapid skin yellowing and pulp liquefaction', 'Stylet fly puncture', 'Chilling injury below 6°C'],
    recommendedBarrier: {
      otr: '50 - 75 cc/m²/day',
      wvtr: '14 - 20 g/m²/day',
      thickness: 'Individual foam sleeve + CFB box',
      atmosphere: 'Expanded EPE foam sleeve + semi-permeable shrink',
    },
    image: '🍈',
    icon: 'guava',
  },
  {
    id: 'food-spinach',
    name: 'Baby Spinach & Tender Greens',
    hindiName: 'पालक और हरी पत्तेदार सब्जियां',
    category: 'Leafy',
    respirationRate: 'Very High',
    ethyleneSensitivity: 'High',
    optimalTemp: '1°C - 3°C',
    optimalRH: '95% - 98%',
    typicalSpoilageRisks: ['Transpiration collapse / limp leaves within 18 hrs', 'Anaerobic slimy decay if sealed tight', 'Yellowing chlorophyll loss'],
    recommendedBarrier: {
      otr: '150 - 220 cc/m²/day',
      wvtr: '30 - 45 g/m²/day',
      thickness: '30 - 40 µm',
      atmosphere: 'Laser-microperforated anti-fog bio-film',
    },
    image: '🥬',
    icon: 'spinach',
  },
  {
    id: 'food-mushroom',
    name: 'Fresh Button Mushrooms',
    hindiName: 'खुंबी / मशरूम',
    category: 'Vegetable',
    respirationRate: 'Very High',
    ethyleneSensitivity: 'Moderate',
    optimalTemp: '2°C - 4°C',
    optimalRH: '90% - 95%',
    typicalSpoilageRisks: ['Cap opening & gill exposure', 'Enzymatic browning (polyphenol oxidase)', 'Sweating water droplet bacterial blotch'],
    recommendedBarrier: {
      otr: '200 - 350 cc/m²/day',
      wvtr: '40 - 70 g/m²/day',
      thickness: 'Pulp tray + 15µm PVC stretch',
      atmosphere: 'Breathable semi-permeable stretch wrap on absorbent punnet',
    },
    image: '🍄',
    icon: 'mushroom',
  },
  {
    id: 'food-mosambi',
    name: 'Sweet Lime / Mosambi',
    hindiName: 'मौसंबी',
    category: 'Fruit',
    respirationRate: 'Low',
    ethyleneSensitivity: 'Moderate',
    optimalTemp: '7°C - 9°C',
    optimalRH: '85% - 90%',
    typicalSpoilageRisks: ['Rind breakdown and pitting', 'Penicillium green mould', 'Stem-end drying'],
    recommendedBarrier: {
      otr: '120 - 180 cc/m²/day',
      wvtr: '20 - 28 g/m²/day',
      thickness: 'Ventilated corrugated master',
      atmosphere: 'Wax coated skin + breathable kraft wrap',
    },
    image: '🍊',
    icon: 'orange',
  },
];

// -------------------------------------------------------------
// 15+ MATERIALS
// -------------------------------------------------------------
export const MOCK_MATERIALS: Material[] = [
  {
    id: 'mat-pet',
    name: 'Polyethylene Terephthalate',
    code: 'PET',
    type: 'Polymer',
    barrierScore: 88,
    sustainabilityScore: 72,
    costRating: '₹₹',
    avgPricePerKg: 135,
    recyclability: 'Code 1 (Widely Recycled in India)',
    suitableFoods: ['Banana', 'Strawberry', 'Tomato', 'Apple'],
    keyStrengths: ['Outstanding clarity', 'Stiff puncture resistance', 'High oxygen barrier'],
  },
  {
    id: 'mat-ldpe',
    name: 'Low-Density Polyethylene',
    code: 'LDPE',
    type: 'Polymer',
    barrierScore: 68,
    sustainabilityScore: 65,
    costRating: '₹',
    avgPricePerKg: 95,
    recyclability: 'Code 4 (Flexible recycling stream)',
    suitableFoods: ['Banana', 'Potato', 'Onion', 'Mango'],
    keyStrengths: ['Puncture resilience', 'Superior moisture barrier', 'Low heat-seal temp'],
  },
  {
    id: 'mat-lldpe',
    name: 'Linear Low-Density Polyethylene',
    code: 'LLDPE',
    type: 'Polymer',
    barrierScore: 72,
    sustainabilityScore: 65,
    costRating: '₹',
    avgPricePerKg: 105,
    recyclability: 'Code 4 (Recyclable)',
    suitableFoods: ['Heavy vegetables', 'Crate liners'],
    keyStrengths: ['Dart impact resistance', 'High tensile elongation', 'Seal integrity'],
  },
  {
    id: 'mat-hdpe',
    name: 'High-Density Polyethylene (Crates)',
    code: 'HDPE',
    type: 'Polymer',
    barrierScore: 78,
    sustainabilityScore: 80,
    costRating: '₹₹',
    avgPricePerKg: 115,
    recyclability: 'Code 2 (100% Circular crates)',
    suitableFoods: ['Tomato', 'Banana', 'Mango', 'Apple'],
    keyStrengths: ['High rigidity', 'Reusable for 5+ years', 'Chemical wash resistance'],
  },
  {
    id: 'mat-bopp',
    name: 'Biaxially Oriented Polypropylene',
    code: 'BOPP',
    type: 'Polymer',
    barrierScore: 82,
    sustainabilityScore: 68,
    costRating: '₹₹',
    avgPricePerKg: 145,
    recyclability: 'Code 5 (PP Stream)',
    suitableFoods: ['Salad greens', 'Herbs', 'Tomatoes'],
    keyStrengths: ['High gloss & transparency', 'Excellent water vapor barrier', 'Crisp feel'],
  },
  {
    id: 'mat-evoh',
    name: 'Ethylene Vinyl Alcohol Copolymer',
    code: 'EVOH',
    type: 'Polymer',
    barrierScore: 98,
    sustainabilityScore: 50,
    costRating: '₹₹₹',
    avgPricePerKg: 380,
    recyclability: 'Multi-layer tie stream (<5% compliant)',
    suitableFoods: ['Cut fruits', 'Ready-to-cook vegetables'],
    keyStrengths: ['World-class gas barrier', 'Retains inert gas flushing', 'Aroma lock'],
  },
  {
    id: 'mat-pa',
    name: 'Polyamide (Nylon-6)',
    code: 'PA',
    type: 'Polymer',
    barrierScore: 89,
    sustainabilityScore: 55,
    costRating: '₹₹₹',
    avgPricePerKg: 290,
    recyclability: 'Technical recovery',
    suitableFoods: ['Heavy produce export', 'Vacuum sealed staples'],
    keyStrengths: ['Extreme puncture barrier', 'Deep thermoformability', 'Abrasion resistance'],
  },
  {
    id: 'mat-pla',
    name: 'Polylactic Acid (Bio-cornstarch)',
    code: 'PLA',
    type: 'Bio-plastic',
    barrierScore: 74,
    sustainabilityScore: 94,
    costRating: '₹₹₹',
    avgPricePerKg: 260,
    recyclability: 'Industrial Compostable (IS/ISO 17088)',
    suitableFoods: ['Strawberry', 'Mushrooms', 'Organic bananas'],
    keyStrengths: ['Zero petroleum reliance', 'Naturally breathable', 'Clear glass-like look'],
  },
  {
    id: 'mat-pbat',
    name: 'Polybutylene Adipate Terephthalate',
    code: 'PBAT',
    type: 'Bio-plastic',
    barrierScore: 65,
    sustainabilityScore: 92,
    costRating: '₹₹₹',
    avgPricePerKg: 240,
    recyclability: 'Home Compostable certified',
    suitableFoods: ['Organic produce pouches', 'Soil-contact crop bags'],
    keyStrengths: ['High flexibility like LDPE', 'Degrades without microplastics', 'Elasticity'],
  },
  {
    id: 'mat-kraft',
    name: 'Unbleached Virgin Kraft Paperboard',
    code: 'KRAFT',
    type: 'Paperboard',
    barrierScore: 55,
    sustainabilityScore: 96,
    costRating: '₹',
    avgPricePerKg: 65,
    recyclability: 'Paper recycling / 100% Biodegradable',
    suitableFoods: ['Potato', 'Apple', 'Onion', 'Mango'],
    keyStrengths: ['Natural breathability', 'Blocks light degradation', 'Cushioning fibers'],
  },
  {
    id: 'mat-bagasse',
    name: 'Molded Sugarcane Bagasse Pulp',
    code: 'BAGASSE',
    type: 'Pulp',
    barrierScore: 58,
    sustainabilityScore: 98,
    costRating: '₹₹',
    avgPricePerKg: 85,
    recyclability: '100% Backyard Compostable in 60 days',
    suitableFoods: ['Strawberry punnets', 'Guava trays', 'Tomato cradles'],
    keyStrengths: ['Absorbs condensation droplets', 'Zero tree felling', 'Rigid shock absorb'],
  },
  {
    id: 'mat-cfb',
    name: 'Corrugated Fluted Boxboard (CFB)',
    code: 'CFB',
    type: 'Paperboard',
    barrierScore: 60,
    sustainabilityScore: 90,
    costRating: '₹',
    avgPricePerKg: 55,
    recyclability: 'Repulpable 8+ cycles in India',
    suitableFoods: ['All transit master cartons'],
    keyStrengths: ['Stacking crush resistance', 'Vibration dampening', 'Cost-effective logistics'],
  },
  {
    id: 'mat-natureflex',
    name: 'Cellulose Regenerated Film',
    code: 'CELLULOSE',
    type: 'Bio-plastic',
    barrierScore: 80,
    sustainabilityScore: 95,
    costRating: '₹₹₹',
    avgPricePerKg: 340,
    recyclability: 'Marine & soil biodegradable',
    suitableFoods: ['Exotic berries', 'Micro-greens'],
    keyStrengths: ['Natural anti-static', 'Permeable to moisture vapor', 'Certified home compost'],
  },
  {
    id: 'mat-cpp',
    name: 'Cast Polypropylene',
    code: 'CPP',
    type: 'Polymer',
    barrierScore: 76,
    sustainabilityScore: 68,
    costRating: '₹',
    avgPricePerKg: 120,
    recyclability: 'Code 5',
    suitableFoods: ['Bakery', 'Vegetable flow-wrap'],
    keyStrengths: ['High heat sealing range', 'Tear resistance', 'Excellent optical clarity'],
  },
  {
    id: 'mat-antifog-film',
    name: 'Active Micro-perforated Polyolefin',
    code: 'MAP-AF',
    type: 'Composite',
    barrierScore: 86,
    sustainabilityScore: 78,
    costRating: '₹₹',
    avgPricePerKg: 175,
    recyclability: 'Mono-material PE Stream (Recyclable)',
    suitableFoods: ['Banana', 'Tomato', 'Spinach', 'Mushroom'],
    keyStrengths: ['Prevents fog droplets', 'Targeted O₂/CO₂ equilibrium', 'Extends shelf life 2.5x'],
  },
];

// -------------------------------------------------------------
// 10 PACKAGING STRUCTURES
// -------------------------------------------------------------
export const MOCK_STRUCTURES: PackagingStructure[] = [
  {
    id: 'struct-pet-pe',
    title: '12µ PET / 40µ LDPE Laminated Pouch',
    structure: '12µm Reverse Printed Biaxially Oriented PET + 40µm Food-Grade LDPE Heat Sealant',
    typicalUse: 'Fresh fruit modified atmosphere packs & export retail liners',
    sealability: 'Wide heat-seal window (125°C - 145°C), hermetic seal',
    otrRange: '45 - 65 cc/m²/day at 23°C, 0% RH',
    wvtrRange: '12 - 18 g/m²/day at 38°C, 90% RH',
    thicknessMicrons: '52 µm total',
    costEstimatePerUnit: '₹1.80 - ₹2.40 per 500g pouch',
    sustainabilityNote: 'Standard laminate; mono-PE recyclable variant available from verified converters',
    carbonFootprint: '48g CO₂e per pouch',
  },
  {
    id: 'struct-cfb-master',
    title: '5-Ply 150 GSM Ventilated Corrugated Master Carton',
    structure: 'Virgin Kraft Top Liner (180 GSM) + Semi-Chemical Fluting + Test Liner (150 GSM)',
    typicalUse: 'Bulk transit for bananas, mangoes, apples with die-cut ventilation slots',
    sealability: 'Hot-melt adhesive or paper tape closure',
    otrRange: 'High air exchange via 6% side ventilation holes',
    wvtrRange: 'Breathable, protects against skin perspiration rot',
    thicknessMicrons: '4.8 mm wall thickness',
    costEstimatePerUnit: '₹28.00 - ₹38.00 per 15 kg master carton',
    sustainabilityNote: '100% biodegradable and recyclable in Indian paper mills',
    carbonFootprint: '310g CO₂e per carton',
  },
  {
    id: 'struct-bagasse-tray',
    title: 'Molded Sugarcane Bagasse Clamshell with Lid Slits',
    structure: '100% Agri-waste Sugarcane Bagasse fiber thermoformed pulp',
    typicalUse: 'Direct retail punnet for strawberries, tomatoes, figs, guavas',
    sealability: 'Mechanical clip lock + optional compostable seal band',
    otrRange: 'Controlled atmospheric diffusion through porous wall',
    wvtrRange: 'Condensation absorbent without fruit soggy contact',
    thicknessMicrons: '850 µm molded wall',
    costEstimatePerUnit: '₹3.20 - ₹4.50 per 250g punnet',
    sustainabilityNote: 'Backyard composts in 45-60 days into organic soil nutrient',
    carbonFootprint: '18g CO₂e per punnet',
  },
  {
    id: 'struct-macro-perforated-pe',
    title: 'Breathable Macro-perforated LDPE Crate Liner',
    structure: '25µm Virgin Food-Grade LDPE with 6mm circular punched venting pattern',
    typicalUse: 'Banana hands & tomato transit inside plastic/wooden crates',
    sealability: 'Twist-tie or overlap fold',
    otrRange: '>400 cc/m²/day (aerated)',
    wvtrRange: 'Permits excess moisture escape during humid monsoon journeys',
    thicknessMicrons: '25 µm',
    costEstimatePerUnit: '₹0.75 - ₹1.10 per crate liner',
    sustainabilityNote: 'Mono-material LDPE; recyclable under Grade 4 plastic rules',
    carbonFootprint: '14g CO₂e per liner',
  },
  {
    id: 'struct-compostable-bio-film',
    title: 'Certified Compostable PLA/PBAT Barrier Pouch',
    structure: '35µm Blown PLA/PBAT Copolymer with bio-based ethylene interceptor layer',
    typicalUse: 'Premium organic supermarket retail packs (Bananas, Papayas, Avocado)',
    sealability: 'Low temp seal (95°C - 110°C)',
    otrRange: '75 - 110 cc/m²/day',
    wvtrRange: '25 - 35 g/m²/day',
    thicknessMicrons: '35 µm',
    costEstimatePerUnit: '₹3.40 - ₹4.80 per pack',
    sustainabilityNote: 'ISO 17088 certified; decomposes naturally in commercial compost',
    carbonFootprint: '22g CO₂e per pack',
  },
  {
    id: 'struct-hdpe-crate',
    title: 'Heavy-Duty Ventilated HDPE Returnable Transit Crate',
    structure: 'Injection Molded High-Density Polyethylene with UV stabilizers (18 kg cap)',
    typicalUse: 'Farm-to-packhouse and packhouse-to-retail closed loop circulation',
    sealability: 'Interlocking stackable rim',
    otrRange: 'Continuous airflow',
    wvtrRange: 'Unrestricted ambient equilibrium',
    thicknessMicrons: '2.5 mm wall',
    costEstimatePerUnit: '₹280.00 - ₹340.00 (Asset lifespan: 500+ trips = ₹0.60/trip)',
    sustainabilityNote: 'Zero-waste circular model; regranulated into new crates at end of life',
    carbonFootprint: '3.8kg CO₂e (amortized: 7g per trip)',
  },
  {
    id: 'struct-antifog-bopp',
    title: '30µm Anti-Fog BOPP Micro-Perforated Flow-Wrap',
    structure: '30µm Corona treated Biaxially Oriented Polypropylene with surfactant anti-fog additive',
    typicalUse: 'Pre-washed leafy vegetables, herbs, seedless grapes, bell peppers',
    sealability: 'Fin-seal and lap-seal compatible up to 120 packs/min',
    otrRange: '120 - 180 cc/m²/day (laser micro-drilled 50µ holes)',
    wvtrRange: '15 - 22 g/m²/day',
    thicknessMicrons: '30 µm',
    costEstimatePerUnit: '₹1.10 - ₹1.60 per pack',
    sustainabilityNote: 'Mono-material PP, recyclable through modern recycling streams',
    carbonFootprint: '19g CO₂e per pack',
  },
  {
    id: 'struct-map-evoh',
    title: 'High-Barrier 7-Layer Co-extruded MAP Pouch (PA/EVOH/PE)',
    structure: 'Nylon / EVOH gas core / Metallocene LLDPE sealant layer',
    typicalUse: 'Cut ready-to-eat fruit chunks, peeled pomegranate arils, exotic export',
    sealability: 'High hot-tack strength across oily/wet film boundaries',
    otrRange: '<2.5 cc/m²/day (Ultra-high barrier)',
    wvtrRange: '<4 g/m²/day',
    thicknessMicrons: '65 µm',
    costEstimatePerUnit: '₹4.20 - ₹5.90 per pouch',
    sustainabilityNote: 'Complex multi-layer; requires specialized delamination or pyrolytic recycling',
    carbonFootprint: '62g CO₂e per pouch',
  },
  {
    id: 'struct-punnet-window',
    title: 'Unbleached Kraft Punnet with Cellulose NatureFlex Window',
    structure: '350 GSM Solid Bleached Sulfate board lined with 20µ plant cellulose clear window',
    typicalUse: 'Gourmet cherries, premium table grapes, organic cherry tomatoes',
    sealability: 'Self-locking tuck flap',
    otrRange: '90 - 140 cc/m²/day',
    wvtrRange: '20 - 28 g/m²/day',
    thicknessMicrons: 'Carton 350 GSM + 20µ window',
    costEstimatePerUnit: '₹4.80 - ₹6.20 per punnet',
    sustainabilityNote: '100% bio-based carton and window; backyard compost friendly',
    carbonFootprint: '25g CO₂e per punnet',
  },
  {
    id: 'struct-active-sachet-liner',
    title: 'Active Potassium Permanganate Sachet + Low-Density Liner',
    structure: '35µm Food LDPE Bag containing 5g encapsulated KMnO₄ active ethylene absorber sachet',
    typicalUse: 'Commercial long-distance banana ripening retardation (delays climacteric spike)',
    sealability: 'Heat sealed or tape gathered neck',
    otrRange: '50 - 70 cc/m²/day with active chemisorption of C₂H₄ gas',
    wvtrRange: '12 - 16 g/m²/day',
    thicknessMicrons: '35 µm + 5g sachet',
    costEstimatePerUnit: '₹2.10 - ₹2.75 per carton pack',
    sustainabilityNote: 'Inert manganese dioxide residue after absorption, liner is recyclable',
    carbonFootprint: '34g CO₂e per setup',
  },
];

// -------------------------------------------------------------
// 10 REALISTIC SUPPLIERS
// -------------------------------------------------------------
export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'supp-greenpack',
    name: 'GreenPack Industries',
    tagline: 'Precision Flexible Packaging & Active Barrier Films',
    logo: 'GP',
    verified: true,
    location: 'Okhla Phase III, New Delhi',
    state: 'Delhi NCR',
    distanceKm: 34,
    rating: 4.9,
    reviewCount: 142,
    yearsActive: 8,
    materialsOffered: ['PET', 'LDPE', 'BOPP', 'MAP-AF', 'LLDPE'],
    capabilities: ['Heat Sealing', '8-Color Flexo Printing', 'Laser Micro-perforation', 'Custom Thickness Gauging', 'Food-Contact Grade ISO 22000'],
    minOrderQuantityKg: 500,
    typicalLeadTimeDays: 7,
    certifications: ['ISO 22000:2018', 'FSSAI Food Contact', 'BRCGS Packaging Materials', 'RoHS Compliant'],
    basePricePerKg: 142,
    productionCapacityTons: 120,
    phone: '+91 98112 45890',
    email: 'orders@greenpackindia.com',
    matchScore: 94,
    scoringFactors: {
      technicalFit: 40,
      cost: 18,
      availability: 15,
      manufacturing: 10,
      sustainability: 6,
      supplyChain: 5,
    },
    strengths: ['Closest to Delhi-Sonipat corridor', 'Rapid 7-day turnaround', 'Proven banana & tomato shelf-life track record'],
    badges: ['Top Match 94%', 'Verified Supplier', 'Fast Dispatch'],
  },
  {
    id: 'supp-ecowrap',
    name: 'EcoWrap Packaging Solutions',
    tagline: '100% Home & Industrial Compostable Biopolymer Packaging',
    logo: 'EW',
    verified: true,
    location: 'Bhosari MIDC, Pune',
    state: 'Maharashtra',
    distanceKm: 120,
    rating: 4.8,
    reviewCount: 98,
    yearsActive: 6,
    materialsOffered: ['PLA', 'PBAT', 'BAGASSE', 'CELLULOSE'],
    capabilities: ['Extrusion Film Blown', 'Compostable Bags', 'Thermoformed Pulp Trays', 'Anti-Fog Coating'],
    minOrderQuantityKg: 300,
    typicalLeadTimeDays: 9,
    certifications: ['CIPET ISO 17088 Certified', 'CPCB Compostable License', 'TUV OK Compost Home'],
    basePricePerKg: 245,
    productionCapacityTons: 65,
    phone: '+91 94220 89123',
    email: 'contact@ecowrapsolutions.in',
    matchScore: 89,
    scoringFactors: {
      technicalFit: 36,
      cost: 13,
      availability: 14,
      manufacturing: 9,
      sustainability: 10,
      supplyChain: 7,
    },
    strengths: ['Leader in non-plastic certifications', 'High sustainability score', 'Zero toxic leachable residues'],
    badges: ['Eco Leader', 'CPCB Certified', 'Low MOQ 300kg'],
  },
  {
    id: 'supp-freshshield',
    name: 'FreshShield Packaging Ltd',
    tagline: 'High-Impact Corrugated Boxes & Cold-Chain Master Cartons',
    logo: 'FS',
    verified: true,
    location: 'Sanand Industrial Estate, Ahmedabad',
    state: 'Gujarat',
    distanceKm: 410,
    rating: 4.7,
    reviewCount: 168,
    yearsActive: 14,
    materialsOffered: ['CFB', 'KRAFT', 'HDPE'],
    capabilities: ['5-Ply & 7-Ply Corrugators', 'Moisture-Resistant Varnish', 'Die-Cut Stacking Trays', 'Drop-Impact Testing Lab'],
    minOrderQuantityKg: 1000,
    typicalLeadTimeDays: 10,
    certifications: ['ISO 9001:2015', 'FSC Chain of Custody', 'Indian Institute of Packaging (IIP) Certified'],
    basePricePerKg: 58,
    productionCapacityTons: 350,
    phone: '+91 79 4001 9876',
    email: 'sales@freshshieldcartons.com',
    matchScore: 86,
    scoringFactors: {
      technicalFit: 34,
      cost: 20,
      availability: 13,
      manufacturing: 10,
      sustainability: 8,
      supplyChain: 1,
    },
    strengths: ['Lowest transit cost per kg of crop', 'Massive production scale', 'Moisture-resistant glues'],
    badges: ['Bulk Scale', 'IIP Tested', 'FSC Wood Source'],
  },
  {
    id: 'supp-agrobarrier',
    name: 'AgroBarrier Technologies',
    tagline: 'Next-Gen Active & Modified Atmosphere Polyfilms',
    logo: 'AB',
    verified: true,
    location: 'Peenya Industrial Area, Bengaluru',
    state: 'Karnataka',
    distanceKm: 850,
    rating: 4.9,
    reviewCount: 84,
    yearsActive: 5,
    materialsOffered: ['MAP-AF', 'PET', 'LDPE', 'EVOH'],
    capabilities: ['Laser Perforation (Custom OTR)', 'Ethylene Gas Scavenging Masterbatch', 'Automated MAP Pouch Conversion'],
    minOrderQuantityKg: 400,
    typicalLeadTimeDays: 8,
    certifications: ['FSSAI Food Contact', 'ISO 22000', 'US FDA Title 21 Compliant'],
    basePricePerKg: 185,
    productionCapacityTons: 90,
    phone: '+91 80 2839 4410',
    email: 'tech@agrobarrier.com',
    matchScore: 92,
    scoringFactors: {
      technicalFit: 40,
      cost: 16,
      availability: 14,
      manufacturing: 9,
      sustainability: 8,
      supplyChain: 5,
    },
    strengths: ['Patented ethylene scavenger additive', 'Exact respiratory matching', 'Extended shelf life guarantee'],
    badges: ['High Tech Fit', 'Verified', 'Active Scavenger'],
  },
  {
    id: 'supp-bharatkraft',
    name: 'Bharat Kraft & Box Manufacturers',
    tagline: 'Reliable Corrugated Packaging for North Indian Farm Hubs',
    logo: 'BK',
    verified: true,
    location: 'Kundli Industrial Belt, Sonipat',
    state: 'Haryana',
    distanceKm: 18,
    rating: 4.6,
    reviewCount: 110,
    yearsActive: 16,
    materialsOffered: ['CFB', 'KRAFT'],
    capabilities: ['Quick Local Dispatch', 'Sturdy 3-Ply & 5-Ply Cartons', 'Custom Farm Brand Printing'],
    minOrderQuantityKg: 500,
    typicalLeadTimeDays: 4,
    certifications: ['MSME Registered', 'Quality Mark India'],
    basePricePerKg: 52,
    productionCapacityTons: 180,
    phone: '+91 130 221 4455',
    email: 'kundli@bharatkraft.co.in',
    matchScore: 84,
    scoringFactors: {
      technicalFit: 30,
      cost: 20,
      availability: 15,
      manufacturing: 9,
      sustainability: 7,
      supplyChain: 3,
    },
    strengths: ['Nearest supplier (18 km)', 'Same-day transport pickup', 'Unbeatable local box pricing'],
    badges: ['Local Hub (18km)', '4-Day Delivery', 'Best Price'],
  },
  {
    id: 'supp-safefood',
    name: 'SafeFood Polyfilms Surat',
    tagline: 'High-Barrier Multi-layer Films & Heat-Seal Pouches',
    logo: 'SF',
    verified: true,
    location: 'Sachin GIDC, Surat',
    state: 'Gujarat',
    distanceKm: 320,
    rating: 4.8,
    reviewCount: 135,
    yearsActive: 9,
    materialsOffered: ['PET', 'PE', 'EVOH', 'PA', 'CPP'],
    capabilities: ['7-Layer Co-extrusion', 'Solventless Lamination', 'Sterilization Grade Seal', 'Custom Slitting'],
    minOrderQuantityKg: 750,
    typicalLeadTimeDays: 11,
    certifications: ['BRCGS AA Grade', 'ISO 22000', 'FSSAI'],
    basePricePerKg: 165,
    productionCapacityTons: 220,
    phone: '+91 261 239 8812',
    email: 'info@safefoodfilms.com',
    matchScore: 87,
    scoringFactors: {
      technicalFit: 38,
      cost: 17,
      availability: 12,
      manufacturing: 10,
      sustainability: 5,
      supplyChain: 5,
    },
    strengths: ['Superior gas barrier specs', 'Zero seal leakage guarantee', 'Cleanroom class 100k facility'],
    badges: ['BRCGS AA Grade', 'High Barrier', 'Large Capacity'],
  },
  {
    id: 'supp-biopulp',
    name: 'BioPulp Agro Packaging',
    tagline: 'Molded Fiber Punnets & Fruit Cradles from Farm Residuals',
    logo: 'BP',
    verified: true,
    location: 'SIDCO Industrial Estate, Coimbatore',
    state: 'Tamil Nadu',
    distanceKm: 980,
    rating: 4.7,
    reviewCount: 62,
    yearsActive: 4,
    materialsOffered: ['BAGASSE', 'PULP', 'KRAFT'],
    capabilities: ['Thermoformed Wet-Pulp Molding', 'Natural Moisture Absorption', 'Custom Die Shapes'],
    minOrderQuantityKg: 250,
    typicalLeadTimeDays: 12,
    certifications: ['TUV Industrial Compost', 'FSSAI Direct Food Contact'],
    basePricePerKg: 92,
    productionCapacityTons: 50,
    phone: '+91 422 258 7760',
    email: 'orders@biopulp.org',
    matchScore: 81,
    scoringFactors: {
      technicalFit: 31,
      cost: 15,
      availability: 11,
      manufacturing: 8,
      sustainability: 10,
      supplyChain: 6,
    },
    strengths: ['Perfect for delicate berries & figs', 'Absorbs sweat water droplets', '100% agri-waste derived'],
    badges: ['100% Bagasse', 'Compostable', 'Low MOQ 250kg'],
  },
  {
    id: 'supp-apex',
    name: 'Apex Flexible Converters',
    tagline: 'High-Speed Automated Form-Fill-Seal Rolls & Pouches',
    logo: 'AF',
    verified: true,
    location: 'Cherlapally, Hyderabad',
    state: 'Telangana',
    distanceKm: 650,
    rating: 4.9,
    reviewCount: 115,
    yearsActive: 11,
    materialsOffered: ['PET', 'LDPE', 'BOPP', 'CPP'],
    capabilities: ['Gravure & CI-Flexo', 'High Slip Low COF Films for Auto-Baggers', 'Zipper & Spout Pouches'],
    minOrderQuantityKg: 800,
    typicalLeadTimeDays: 9,
    certifications: ['ISO 9001', 'ISO 22000', 'Sedex Smeta Audited'],
    basePricePerKg: 138,
    productionCapacityTons: 280,
    phone: '+91 40 2712 3390',
    email: 'biz@apexconverters.com',
    matchScore: 88,
    scoringFactors: {
      technicalFit: 37,
      cost: 19,
      availability: 13,
      manufacturing: 10,
      sustainability: 5,
      supplyChain: 4,
    },
    strengths: ['Optimum for high-speed automated packing lines', 'Exact thickness tolerance ±2µ', 'Reliable pricing'],
    badges: ['High Speed', 'Sedex Audited', 'Top Converter'],
  },
  {
    id: 'supp-northstar',
    name: 'NorthStar Crate Solutions',
    tagline: 'Reusable Returnable Plastic Crates & Smart RFID Assets',
    logo: 'NS',
    verified: true,
    location: 'Industrial Area Phase 2, Chandigarh',
    state: 'Punjab & Chandigarh',
    distanceKm: 210,
    rating: 4.8,
    reviewCount: 92,
    yearsActive: 11,
    materialsOffered: ['HDPE', 'PP'],
    capabilities: ['Heavy Tonnage Injection Presses', 'Perforated Nestable & Stackable Crates', 'Asset Buyback Program'],
    minOrderQuantityKg: 200,
    typicalLeadTimeDays: 5,
    certifications: ['IS 7933 Food Handling Standard', 'ISO 9001'],
    basePricePerKg: 125,
    productionCapacityTons: 160,
    phone: '+91 172 265 9940',
    email: 'info@northstarcrates.com',
    matchScore: 85,
    scoringFactors: {
      technicalFit: 32,
      cost: 18,
      availability: 15,
      manufacturing: 9,
      sustainability: 8,
      supplyChain: 3,
    },
    strengths: ['Eliminates single-use waste in closed circuits', 'Rugged 5-year life', 'Stackable design saves 60% empty volume'],
    badges: ['Circular Asset', '5-Year Durability', 'Fast Delivery'],
  },
  {
    id: 'supp-naturepack',
    name: 'NaturePack Organics',
    tagline: 'Seaweed & Cassava Based Marine-Degradable Biofilms',
    logo: 'NP',
    verified: true,
    location: 'Kinfra Bio-Park, Kochi',
    state: 'Kerala',
    distanceKm: 1450,
    rating: 4.9,
    reviewCount: 47,
    yearsActive: 3,
    materialsOffered: ['PLA', 'PBAT', 'CELLULOSE'],
    capabilities: ['Bio-polymers blending', 'Water-soluble protective seals', 'Carbon Negative R&D'],
    minOrderQuantityKg: 200,
    typicalLeadTimeDays: 14,
    certifications: ['EU EN 13432', 'ASTM D6400', 'Ocean Degradable Tested'],
    basePricePerKg: 320,
    productionCapacityTons: 30,
    phone: '+91 484 297 1234',
    email: 'sustain@naturepack.bio',
    matchScore: 79,
    scoringFactors: {
      technicalFit: 33,
      cost: 11,
      availability: 9,
      manufacturing: 7,
      sustainability: 10,
      supplyChain: 9,
    },
    strengths: ['Zero plastic footprint', '100% natural bio ingredients', 'Unique storytelling for organic exports'],
    badges: ['Marine Safe', 'Carbon Negative', 'Organic Certified'],
  },
];

// -------------------------------------------------------------
// 10 PACKAGING PROJECTS (Seeded with Rajesh Kumar's Banana project as #1)
// -------------------------------------------------------------
export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-banana-1',
    title: 'Banana — 500 kg Export & Domestic Retail Pack',
    foodId: 'food-banana',
    foodName: 'Banana (Cavendish / Robusta)',
    foodCategory: 'Fruit',
    quantity: 500,
    unit: 'kg',
    targetShelfLifeDays: 10,
    journeyStages: ['Farm Harvest', 'Packhouse Grading', 'Refrigerated Transport', 'Central Storage', 'Retail Market'],
    temperatureCondition: '10°C - 14°C Controlled',
    humidityLevel: 'Humid',
    transportDurationHours: 18,
    distanceKm: 320,
    storageType: 'Cold Storage with Ethylene Ventilation',
    reportedProblems: ['Short shelf life', 'Mechanical bruising', 'Moisture condensation / Black mould'],
    priorities: ['Longer shelf life', 'Lowest cost', 'Local availability'],
    currentPackaging: 'Open plastic crates without protective liner',
    createdAt: '2026-09-28',
    status: 'BLUEPRINT',
    selectedOptionId: 'option-balanced',
    selectedSupplierId: 'supp-greenpack',
    selectedQuoteId: 'quote-gp-1',
    orderTimeline: {
      step: 'recommendation',
      updatedAt: '2026-09-29',
      expectedDelivery: '14 Oct 2026',
    },
  },
  {
    id: 'proj-tomato-2',
    title: 'Tomato — 250 kg Fresh Hybrid Dispatch',
    foodId: 'food-tomato',
    foodName: 'Tomato (Roma / Hybrid)',
    foodCategory: 'Vegetable',
    quantity: 250,
    unit: 'kg',
    targetShelfLifeDays: 7,
    journeyStages: ['Farm', 'Sorting Packhouse', 'Transit (Tempo)', 'Vegetable Mandi'],
    temperatureCondition: 'Ambient (22°C - 26°C)',
    humidityLevel: 'Normal',
    transportDurationHours: 6,
    distanceKm: 95,
    storageType: 'Ventilated Shed',
    reportedProblems: ['Bruising from stacking', 'Puncture leaks', 'Moisture condensation'],
    priorities: ['Lowest cost', 'Easy manufacturing'],
    currentPackaging: 'Bamboo Tokri / Wooden boxes',
    createdAt: '2026-09-27',
    status: 'QUOTES_RECEIVED',
    selectedOptionId: 'option-cost',
  },
  {
    id: 'proj-mango-3',
    title: 'Alphonso Mango — 1000 kg Premium Export Consignment',
    foodId: 'food-mango',
    foodName: 'Alphonso Mango',
    foodCategory: 'Fruit',
    quantity: 1000,
    unit: 'kg',
    targetShelfLifeDays: 14,
    journeyStages: ['Farm Orchard', 'Vapour Heat Treatment', 'Air Freight Hub', 'International Retail'],
    temperatureCondition: '12°C Controlled Cold Chain',
    humidityLevel: 'Humid',
    transportDurationHours: 36,
    distanceKm: 1800,
    storageType: 'Pre-cooled Cold Chamber',
    reportedProblems: ['Sap burn blemishes', 'Rapid softening', 'Anthracnose fungal spots'],
    priorities: ['Longer shelf life', 'Sustainability', 'Balanced quality'],
    currentPackaging: 'Conventional 3-ply carton',
    createdAt: '2026-09-24',
    status: 'ORDER_PLACED',
    selectedSupplierId: 'supp-ecowrap',
    orderTimeline: {
      step: 'production',
      updatedAt: '2026-09-29',
      expectedDelivery: '05 Oct 2026',
      courier: 'ColdExpress Logistics',
      trackingNumber: 'CX-992140',
    },
  },
  {
    id: 'proj-grapes-4',
    title: 'Thompson Grapes — 2000 kg Cold Chain Transit',
    foodId: 'food-grapes',
    foodName: 'Thompson Seedless Grapes',
    foodCategory: 'Fruit',
    quantity: 2000,
    unit: 'kg',
    targetShelfLifeDays: 25,
    journeyStages: ['Vineyard', 'Pre-cooling Packhouse', 'Reefer Container', 'Supermarket Distribution'],
    temperatureCondition: '0°C to 1°C Reefer',
    humidityLevel: 'Humid',
    transportDurationHours: 72,
    distanceKm: 1200,
    storageType: 'Reefer Cold Room',
    reportedProblems: ['Rachis stem browning', 'Berry drop', 'Mould onset'],
    priorities: ['Longer shelf life', 'High puncture resistance'],
    currentPackaging: 'Standard plastic punnets in master carton',
    createdAt: '2026-09-20',
    status: 'DISPATCHED',
    selectedSupplierId: 'supp-agrobarrier',
    orderTimeline: {
      step: 'dispatched',
      updatedAt: '2026-09-28',
      expectedDelivery: '02 Oct 2026',
      courier: 'BlueDart Reefer Air',
      trackingNumber: 'BD-884120',
    },
  },
  {
    id: 'proj-apple-5',
    title: 'Himachal Apple — 1500 kg Stacking & Shock Protection',
    foodId: 'food-apple',
    foodName: 'Royal Delicious Apple (Himachal)',
    foodCategory: 'Fruit',
    quantity: 1500,
    unit: 'kg',
    targetShelfLifeDays: 30,
    journeyStages: ['Orchard Shimla', 'Grading Center', 'Mountain Transit', 'Delhi Azadpur Hub'],
    temperatureCondition: '4°C Cold Storage',
    humidityLevel: 'Normal',
    transportDurationHours: 14,
    distanceKm: 380,
    storageType: 'CA Controlled Atmosphere Storage',
    reportedProblems: ['Pressure bruises during transit', 'Skin scald', 'Weight loss'],
    priorities: ['Stacking strength', 'Lowest cost per kg'],
    currentPackaging: 'Rough pine wood crates with newspaper',
    createdAt: '2026-09-10',
    status: 'EVALUATED',
    selectedSupplierId: 'supp-freshshield',
    performanceData: {
      targetShelfLife: 30,
      actualShelfLifeAchieved: 34,
      spoilageRateBefore: 22,
      spoilageRateAfter: 3.5,
      damagePercentage: 2,
      satisfactionRating: 5,
      packagingFailures: ['None'],
      userNotes: 'The 5-ply CFB with molded pulp trays eliminated mountain transit compression bruises completely. Reached Azadpur Mandi with zero rejection.',
      submittedAt: '2026-09-26',
      verifiedAchieved: true,
    },
  },
  {
    id: 'proj-potato-6',
    title: 'Table Potato — 5000 kg Light-Shield Storage',
    foodId: 'food-potato',
    foodName: 'Potato (Table & Processing)',
    foodCategory: 'Vegetable',
    quantity: 5000,
    unit: 'kg',
    targetShelfLifeDays: 45,
    journeyStages: ['Farm Digging', 'Curing Shed', 'Long Distance Truck', 'City Wholesale'],
    temperatureCondition: 'Ambient Shade (18°C - 22°C)',
    humidityLevel: 'Normal',
    transportDurationHours: 24,
    distanceKm: 650,
    storageType: 'Dark Ventilated Warehouse',
    reportedProblems: ['Greening under light exposure', 'Early sprouting', 'Rotting bags'],
    priorities: ['Lowest cost', 'Light barrier', 'High capacity'],
    currentPackaging: 'Jute gunny bags',
    createdAt: '2026-09-25',
    status: 'DRAFT',
  },
  {
    id: 'proj-spinach-7',
    title: 'Organic Baby Spinach — 100 kg Zero-Wilting Pack',
    foodId: 'food-spinach',
    foodName: 'Baby Spinach & Tender Greens',
    foodCategory: 'Leafy',
    quantity: 100,
    unit: 'kg',
    targetShelfLifeDays: 5,
    journeyStages: ['Hydroponic Polyhouse', 'Cold Wash & Spin', 'Insulated Van', 'Direct-to-Consumer Quick Commerce'],
    temperatureCondition: '2°C - 4°C Ice Chilled',
    humidityLevel: 'Humid',
    transportDurationHours: 3,
    distanceKm: 45,
    storageType: 'Dark Chiller',
    reportedProblems: ['Rapid limp wilting within 6 hours', 'Moisture sweat slime in hot weather'],
    priorities: ['Longer shelf life', 'Anti-fog clarity', 'Sustainability'],
    currentPackaging: 'Normal unperforated polythene bag',
    createdAt: '2026-09-29',
    status: 'SUPPLIER_MATCH',
  },
  {
    id: 'proj-strawberry-8',
    title: 'Mahabaleshwar Strawberry — 300 kg Clamshell Punnet',
    foodId: 'food-strawberry',
    foodName: 'Strawberry (Winter Dawn)',
    foodCategory: 'Fruit',
    quantity: 300,
    unit: 'kg',
    targetShelfLifeDays: 7,
    journeyStages: ['Farm Polyhouse', 'Soft Packing', 'Reefer Van', 'Mumbai Retail Stores'],
    temperatureCondition: '1°C - 3°C',
    humidityLevel: 'Humid',
    transportDurationHours: 7,
    distanceKm: 260,
    storageType: 'Walk-in Cooler',
    reportedProblems: ['Botrytis grey mould', 'Squashed berries on bottom layer', 'Cap moisture sweating'],
    priorities: ['Gentle cushioning', 'Anti-fog condensation control'],
    currentPackaging: 'Flimsy PVC punnets with rubber band',
    createdAt: '2026-09-23',
    status: 'ORDER_PLACED',
    selectedSupplierId: 'supp-biopulp',
  },
  {
    id: 'proj-onion-9',
    title: 'Nasik Red Onion — 3000 kg Aerated Mesh Bagging',
    foodId: 'food-onion',
    foodName: 'Red Onion (Nasik Premium)',
    foodCategory: 'Vegetable',
    quantity: 3000,
    unit: 'kg',
    targetShelfLifeDays: 30,
    journeyStages: ['Farm Mandi', 'Rail Rake', 'Port Terminal Container'],
    temperatureCondition: 'Dry Ambient (24°C - 30°C)',
    humidityLevel: 'Dry',
    transportDurationHours: 48,
    distanceKm: 1400,
    storageType: 'Open Air Mesh Shed',
    reportedProblems: ['Neck rot in damp humidity', 'Weight shrinkage'],
    priorities: ['Lowest cost', 'Air circulation'],
    currentPackaging: 'Woven HDPE leno mesh bags',
    createdAt: '2026-09-18',
    status: 'BLUEPRINT',
  },
  {
    id: 'proj-guava-10',
    title: 'Safeda Guava — 800 kg Foam Sleeve + Tray Pack',
    foodId: 'food-guava',
    foodName: 'Allahabad Guava (Safeda)',
    foodCategory: 'Fruit',
    quantity: 800,
    unit: 'kg',
    targetShelfLifeDays: 9,
    journeyStages: ['Orchard', 'Local Packing', 'Road Truck', 'Delhi Retail'],
    temperatureCondition: '8°C - 10°C Cool Room',
    humidityLevel: 'Normal',
    transportDurationHours: 12,
    distanceKm: 620,
    storageType: 'Cooling godown',
    reportedProblems: ['Skin friction blackening', 'Softening over 3 days'],
    priorities: ['Abrasion prevention', 'Low packaging cost'],
    currentPackaging: 'Newspaper wrapping in bamboo baskets',
    createdAt: '2026-09-15',
    status: 'IMPLEMENTED',
    selectedSupplierId: 'supp-bharatkraft',
  },
];

// -------------------------------------------------------------
// 3 PACKAGING BLUEPRINT OPTIONS (for Banana 500kg demo project)
// -------------------------------------------------------------
export const MOCK_PROJECT_OPTIONS: Record<string, ProjectOption[]> = {
  'proj-banana-1': [
    {
      id: 'option-balanced',
      name: 'Option 1: Balanced (Recommended)',
      tagline: 'Optimal trade-off between extended shelf life, material availability & packaging economics',
      badge: 'PACKITUP Recommended',
      material: 'PET / LDPE Co-extruded Micro-perforated Film',
      structure: '12µm Biaxially Oriented PET + 40µm Sealable Metallocene LDPE with anti-fog & laser venting',
      estimatedShelfLifeDays: 12,
      costPerPackage: 2.10,
      moqUnits: 500,
      availabilityScore: 92,
      sustainabilityScore: 78,
      costScore: 88,
      technicalFitScore: 95,
      leadTimeDays: 7,
      whyChoose: 'Maintains ideal 3-5% O₂ and 5% CO₂ equilibrium atmosphere to put bananas in suspended respiration, delaying starch-to-sugar ripening by 6 extra days.',
      tradeoffs: 'Requires proper heat-sealing equipment (130°C). Moderately higher initial bag cost than open polythene, offset by 85% spoilage reduction.',
    },
    {
      id: 'option-cost',
      name: 'Option 2: Lower Cost (Budget)',
      tagline: 'Maximum economic savings for fast turnaround local mandi distribution',
      badge: 'Lowest Initial Cost',
      material: 'Macro-Perforated 25µ Virgin LDPE Liner in Corrugated Box',
      structure: '25µm LDPE liner bag with punch holes inside 5-Ply recycled CFB box',
      estimatedShelfLifeDays: 9,
      costPerPackage: 1.15,
      moqUnits: 250,
      availabilityScore: 98,
      sustainabilityScore: 70,
      costScore: 97,
      technicalFitScore: 78,
      leadTimeDays: 4,
      whyChoose: 'Readily available from any local supplier within 24 hours. Costs less than half of specialized laminates with decent mechanical bruising cushion.',
      tradeoffs: 'Does not trap ethylene gas; ripening will proceed faster in warm ambient conditions above 22°C.',
    },
    {
      id: 'option-sustain',
      name: 'Option 3: More Sustainable (Eco-Premium)',
      tagline: '100% Certified Compostable Bio-Polymer for green branding & conscious retailers',
      badge: 'Zero Plastic Footprint',
      material: 'Cornstarch PLA / PBAT Bio-Polymer Film',
      structure: '35µm Breathable Home-Compostable film with organic ethylene interceptor',
      estimatedShelfLifeDays: 11,
      costPerPackage: 3.45,
      moqUnits: 300,
      availabilityScore: 75,
      sustainabilityScore: 98,
      costScore: 65,
      technicalFitScore: 89,
      leadTimeDays: 10,
      whyChoose: 'Backyard compostable, zero petroleum dependency, commands up to 15% price premium on supermarket shelves for certified residue-free packaging.',
      tradeoffs: 'Higher unit cost (₹3.45/pkg) and requires dry indoor storage prior to usage to prevent premature biodegradation.',
    },
  ],
};

// -------------------------------------------------------------
// 15 RFQs & 10 QUOTES
// -------------------------------------------------------------
export const MOCK_RFQS: RFQ[] = [
  {
    id: 'rfq-banana-gp',
    projectId: 'proj-banana-1',
    supplierId: 'supp-greenpack',
    producerName: 'Rajesh Kumar (GreenField FPO)',
    productName: 'Banana (Cavendish / Robusta)',
    quantityKg: 500,
    targetShelfLifeDays: 10,
    structureRequested: '12µ PET / 40µ LDPE Laminated Pouch with micro-perforations',
    deliveryLocation: 'Sonipat / Azadpur Mandi, Delhi NCR',
    requiredByDate: '12 Oct 2026',
    notes: 'Need food-grade certificate and anti-fog additive for refrigerated transit.',
    status: 'QUOTE_RECEIVED',
    createdAt: '2026-09-29',
  },
  {
    id: 'rfq-banana-ew',
    projectId: 'proj-banana-1',
    supplierId: 'supp-ecowrap',
    producerName: 'Rajesh Kumar (GreenField FPO)',
    productName: 'Banana (Cavendish / Robusta)',
    quantityKg: 500,
    targetShelfLifeDays: 10,
    structureRequested: 'Compostable PLA/PBAT 35µm pouch',
    deliveryLocation: 'Sonipat, Haryana',
    requiredByDate: '14 Oct 2026',
    notes: 'Please quote MOQ and lead time for batch delivery.',
    status: 'QUOTE_RECEIVED',
    createdAt: '2026-09-29',
  },
  {
    id: 'rfq-banana-ab',
    projectId: 'proj-banana-1',
    supplierId: 'supp-agrobarrier',
    producerName: 'Rajesh Kumar (GreenField FPO)',
    productName: 'Banana (Cavendish / Robusta)',
    quantityKg: 500,
    targetShelfLifeDays: 10,
    structureRequested: 'MAP Active Ethylene Scavenger Film',
    deliveryLocation: 'Sonipat, Haryana',
    requiredByDate: '15 Oct 2026',
    notes: 'Require sample roll for pilot trial test.',
    status: 'QUOTE_RECEIVED',
    createdAt: '2026-09-29',
  },
  {
    id: 'rfq-tomato-bk',
    projectId: 'proj-tomato-2',
    supplierId: 'supp-bharatkraft',
    producerName: 'Suresh Patel',
    productName: 'Tomato (Roma / Hybrid)',
    quantityKg: 250,
    targetShelfLifeDays: 7,
    structureRequested: '5-Ply Ventilated Corrugated Cartons (10 kg capacity)',
    deliveryLocation: 'Ahmedabad, Gujarat',
    requiredByDate: '06 Oct 2026',
    notes: 'Stacking up to 8 boxes in open trucks.',
    status: 'QUOTE_RECEIVED',
    createdAt: '2026-09-27',
  },
  {
    id: 'rfq-mango-ew',
    projectId: 'proj-mango-3',
    supplierId: 'supp-ecowrap',
    producerName: 'Ratnagiri Mango Growers Association',
    productName: 'Alphonso Mango',
    quantityKg: 1000,
    targetShelfLifeDays: 14,
    structureRequested: 'Molded Bagasse Clamshell + PLA Film',
    deliveryLocation: 'Mumbai Air Cargo Terminal',
    requiredByDate: '03 Oct 2026',
    notes: 'Export grade certification mandatory.',
    status: 'ACCEPTED',
    createdAt: '2026-09-24',
  },
];

export const MOCK_QUOTES: Quote[] = [
  {
    id: 'quote-gp-1',
    rfqId: 'rfq-banana-gp',
    projectId: 'proj-banana-1',
    supplierId: 'supp-greenpack',
    supplierName: 'GreenPack Industries',
    supplierLocation: 'Okhla, New Delhi (34 km)',
    pricePerPackage: 2.10,
    totalCost: 10500, // for 5000 packages (500kg in 100g/hands)
    moq: 500,
    leadTimeDays: 7,
    structureOffered: '12µ PET / 40µ LDPE Co-ex with Laser Venting & Anti-Fog',
    thickness: '52 µm',
    sampleAvailable: true,
    validityDays: 14,
    notes: 'Includes FSSAI food grade batch certificate. Delivery via direct tempo to Sonipat.',
    isBestValue: true,
    technicalMatch: 95,
    sustainabilityRating: 'Recyclable Mono-PE Stream',
    createdAt: '2026-09-29',
  },
  {
    id: 'quote-ab-1',
    rfqId: 'rfq-banana-ab',
    projectId: 'proj-banana-1',
    supplierId: 'supp-agrobarrier',
    supplierName: 'AgroBarrier Technologies',
    supplierLocation: 'Peenya, Bengaluru (850 km)',
    pricePerPackage: 2.45,
    totalCost: 12250,
    moq: 400,
    leadTimeDays: 8,
    structureOffered: 'Patented KMnO₄ Impregnated Polyolefin Active Scavenger Film',
    thickness: '48 µm',
    sampleAvailable: true,
    validityDays: 20,
    notes: 'Guaranteed 12+ day shelf life under 14°C cold storage. Air courier included.',
    isBestValue: false,
    technicalMatch: 98,
    sustainabilityRating: 'Recyclable Polymer',
    createdAt: '2026-09-29',
  },
  {
    id: 'quote-ew-1',
    rfqId: 'rfq-banana-ew',
    projectId: 'proj-banana-1',
    supplierId: 'supp-ecowrap',
    supplierName: 'EcoWrap Packaging Solutions',
    supplierLocation: 'Pune, Maharashtra (120 km)',
    pricePerPackage: 3.20,
    totalCost: 16000,
    moq: 300,
    leadTimeDays: 9,
    structureOffered: '35µm 100% Home Compostable PLA/PBAT Breathable Film',
    thickness: '35 µm',
    sampleAvailable: true,
    validityDays: 15,
    notes: 'Certified CPCB compostable under Rule 4(h). Ideal for organic retail positioning.',
    isBestValue: false,
    technicalMatch: 90,
    sustainabilityRating: '100% Home Compostable',
    createdAt: '2026-09-29',
  },
];

// -------------------------------------------------------------
// 10 MESSAGES / CHATS
// -------------------------------------------------------------
export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat-greenpack',
    supplierId: 'supp-greenpack',
    supplierName: 'GreenPack Industries',
    supplierLogo: 'GP',
    projectId: 'proj-banana-1',
    projectTitle: 'Banana — 500 kg',
    lastMessage: 'Your custom quotation is ready: ₹2.10/pack with 7-day dispatch.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    onlineStatus: true,
  },
  {
    id: 'chat-agrobarrier',
    supplierId: 'supp-agrobarrier',
    supplierName: 'AgroBarrier Technologies',
    supplierLogo: 'AB',
    projectId: 'proj-banana-1',
    projectTitle: 'Banana — 500 kg',
    lastMessage: 'We have dispatched sample test pouch roll to your Sonipat farm.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    onlineStatus: false,
  },
  {
    id: 'chat-ecowrap',
    supplierId: 'supp-ecowrap',
    supplierName: 'EcoWrap Solutions',
    supplierLogo: 'EW',
    projectId: 'proj-banana-1',
    projectTitle: 'Banana — 500 kg',
    lastMessage: 'CPCB compostable certification doc attached for verification.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    onlineStatus: true,
  },
  {
    id: 'chat-freshshield',
    supplierId: 'supp-freshshield',
    supplierName: 'FreshShield Packaging',
    supplierLogo: 'FS',
    projectId: 'proj-apple-5',
    projectTitle: 'Himachal Apple — 1500 kg',
    lastMessage: 'Glad the 5-ply cartons performed so well! Re-order anytime.',
    lastMessageTime: '3 days ago',
    unreadCount: 0,
    onlineStatus: false,
  },
];

export const MOCK_MESSAGES: Record<string, MessageItem[]> = {
  'chat-greenpack': [
    {
      id: 'msg-1',
      chatId: 'chat-greenpack',
      senderId: 'user-rajesh',
      senderName: 'Rajesh Kumar',
      senderRole: 'producer',
      text: 'Namaste! We need 500 kg packaging for fresh Robusta bananas destined for Azadpur Mandi. We need 10 days shelf life without crown bruising.',
      timestamp: 'Yesterday 04:15 PM',
      hasRequirementCard: true,
      requirementData: {
        food: 'Banana (Robusta)',
        qty: '500 kg',
        structure: '12µ PET / 40µ LDPE (Micro-perforated)',
      },
    },
    {
      id: 'msg-2',
      chatId: 'chat-greenpack',
      senderId: 'supp-greenpack',
      senderName: 'GreenPack Technical Desk',
      senderRole: 'supplier',
      text: 'Hello Rajesh ji! PACKITUP shared your requirement with our plant in Okhla. We have ready stock of the 52µm PET/LDPE food-grade laminate with laser micro-perforations tuned specifically for banana respiration.',
      timestamp: 'Yesterday 05:20 PM',
    },
    {
      id: 'msg-3',
      chatId: 'chat-greenpack',
      senderId: 'supp-greenpack',
      senderName: 'GreenPack Technical Desk',
      senderRole: 'supplier',
      text: 'Here is your official formal quotation. We can deliver within 7 days directly to your Sonipat packhouse.',
      timestamp: 'Today 10:45 AM',
      hasQuoteCard: true,
      quoteData: {
        quoteId: 'quote-gp-1',
        price: 2.10,
        moq: 500,
        leadTime: '7 days',
      },
    },
  ],
};

// ==========================================
// PACKITUP ECOSYSTEM ENHANCEMENT MOCK DATA
// ==========================================

export interface CommodityItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  respirationClass: 'None' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
  moisture: number;
  fat: number;
  pH: number;
  respirationRate: number; // mL CO2/kg/h
  oxygenSensitivity: 'low' | 'medium' | 'high' | 'very_high';
}

export const COMMODITIES: CommodityItem[] = [
  { id: 'banana', name: 'Banana (Cavendish)', emoji: '🍌', category: 'fresh_fruit', respirationClass: 'High', moisture: 75, fat: 0.3, pH: 5.0, respirationRate: 80, oxygenSensitivity: 'medium' },
  { id: 'mango', name: 'Mango (Alphonso)', emoji: '🥭', category: 'fresh_fruit', respirationClass: 'High', moisture: 83, fat: 0.4, pH: 3.9, respirationRate: 65, oxygenSensitivity: 'medium' },
  { id: 'apple', name: 'Apple (Shimla)', emoji: '🍎', category: 'fresh_fruit', respirationClass: 'Low', moisture: 86, fat: 0.2, pH: 3.5, respirationRate: 12, oxygenSensitivity: 'medium' },
  { id: 'grapes', name: 'Grapes (Thompson)', emoji: '🍇', category: 'fresh_fruit', respirationClass: 'Low', moisture: 81, fat: 0.2, pH: 3.5, respirationRate: 8, oxygenSensitivity: 'high' },
  { id: 'tomato', name: 'Tomato', emoji: '🍅', category: 'fresh_vegetable', respirationClass: 'Medium', moisture: 94, fat: 0.2, pH: 4.2, respirationRate: 25, oxygenSensitivity: 'low' },
  { id: 'spinach', name: 'Spinach / Palak', emoji: '🥬', category: 'fresh_vegetable', respirationClass: 'VeryHigh', moisture: 91, fat: 0.4, pH: 6.3, respirationRate: 180, oxygenSensitivity: 'low' },
  { id: 'potato', name: 'Potato', emoji: '🥔', category: 'fresh_vegetable', respirationClass: 'Low', moisture: 79, fat: 0.1, pH: 6.1, respirationRate: 6, oxygenSensitivity: 'low' },
  { id: 'chips', name: 'Potato Chips / Namkeen', emoji: '🥔', category: 'processed_snack', respirationClass: 'None', moisture: 2, fat: 35, pH: 6.5, respirationRate: 0, oxygenSensitivity: 'very_high' },
  { id: 'biscuits', name: 'Biscuits / Cookies', emoji: '🍪', category: 'bakery', respirationClass: 'None', moisture: 4, fat: 18, pH: 7.0, respirationRate: 0, oxygenSensitivity: 'medium' },
  { id: 'rice', name: 'Rice / Basmati', emoji: '🍚', category: 'grains', respirationClass: 'None', moisture: 12, fat: 0.5, pH: 6.5, respirationRate: 0, oxygenSensitivity: 'low' },
  { id: 'wheat', name: 'Wheat Flour / Atta', emoji: '🌾', category: 'grains', respirationClass: 'None', moisture: 13, fat: 1.5, pH: 6.0, respirationRate: 0, oxygenSensitivity: 'low' },
  { id: 'turmeric', name: 'Turmeric / Haldi', emoji: '🌿', category: 'spice', respirationClass: 'None', moisture: 8, fat: 3, pH: 6.5, respirationRate: 0, oxygenSensitivity: 'medium' },
  { id: 'paneer', name: 'Paneer / Cottage Cheese', emoji: '🧀', category: 'dairy', respirationClass: 'None', moisture: 55, fat: 22, pH: 5.5, respirationRate: 0, oxygenSensitivity: 'high' },
  { id: 'chicken', name: 'Chicken (Fresh)', emoji: '🍗', category: 'meat', respirationClass: 'None', moisture: 70, fat: 12, pH: 5.7, respirationRate: 0, oxygenSensitivity: 'very_high' },
  { id: 'bread', name: 'Bread / Pav', emoji: '🍞', category: 'bakery', respirationClass: 'None', moisture: 38, fat: 4, pH: 5.5, respirationRate: 0, oxygenSensitivity: 'medium' },
];

export interface ConverterProfile {
  id: string;
  name: string;
  location: string;
  distance: number;
  rating: number;
  totalOrders: number;
  certifications: string[];
  machines: string[];
  materials: string[];
  maxFilmWidth: number;
  thicknessRange: [number, number];
  mapCapable: boolean;
  moq: number;
  leadTime: number;
  onTimeDelivery: number;
  badge: 'top_rated' | 'verified' | 'eco_certified';
  description: string;
  phone?: string;
  email?: string;
}

export const MOCK_CONVERTERS: ConverterProfile[] = [
  {
    id: 'conv-greenpack',
    name: 'GreenPack Films Pvt Ltd',
    location: 'Okhla Industrial Area, Delhi',
    distance: 8.2,
    rating: 4.8,
    totalOrders: 234,
    certifications: ['ISO 22000', 'FSSAI', 'REACH'],
    machines: ['Blown Film LDPE/HDPE', 'PET Lamination', 'Micro-perforation'],
    materials: ['LDPE', 'HDPE', 'PET', 'BOPP'],
    maxFilmWidth: 1500,
    thicknessRange: [20, 200],
    mapCapable: true,
    moq: 500,
    leadTime: 7,
    onTimeDelivery: 97,
    badge: 'top_rated',
    description: 'Specializes in food-grade flexible packaging for fresh produce. FSSAI-approved facility.',
    phone: '+91 98112 45890',
    email: 'contact@greenpackfilms.in',
  },
  {
    id: 'conv-pactech',
    name: 'PacTech Industries',
    location: 'Sector 63, Noida, UP',
    distance: 14.5,
    rating: 4.6,
    totalOrders: 189,
    certifications: ['FSSAI', 'BIS'],
    machines: ['Co-extrusion PET/PE', 'Pouch making', 'Slitting'],
    materials: ['PET', 'LDPE', 'PP'],
    maxFilmWidth: 1200,
    thicknessRange: [15, 150],
    mapCapable: false,
    moq: 1000,
    leadTime: 5,
    onTimeDelivery: 87,
    badge: 'verified',
    description: 'Mid-size converter specializing in PET-based laminates and pouches.',
    phone: '+91 98712 99401',
    email: 'sales@pactechindustries.com',
  },
  {
    id: 'conv-ecofilm',
    name: 'EcoFilm Solutions',
    location: 'Manesar, Haryana',
    distance: 22.0,
    rating: 4.4,
    totalOrders: 98,
    certifications: ['ISO 22000', 'FSC', 'Compostable (TUV)'],
    machines: ['PLA/PBAT blown film', 'Cellulose coating'],
    materials: ['PLA', 'PBAT', 'Cellulose-nano'],
    maxFilmWidth: 800,
    thicknessRange: [25, 100],
    mapCapable: false,
    moq: 200,
    leadTime: 10,
    onTimeDelivery: 92,
    badge: 'eco_certified',
    description: "India's leading biodegradable packaging converter. Certified home-compostable films.",
    phone: '+91 99102 33441',
    email: 'support@ecofilms.co.in',
  },
  {
    id: 'conv-nova',
    name: 'Nova Laminates & Pouches',
    location: 'Kundli Phase II, Sonipat',
    distance: 9.4,
    rating: 4.9,
    totalOrders: 312,
    certifications: ['ISO 22000', 'HACCP', 'FSSAI'],
    machines: ['High-speed 8-color Rotogravure', 'Solventless Laminator', 'MAP Vacuum Form'],
    materials: ['PET', 'BOPP', 'EVOH', 'Al Foil'],
    maxFilmWidth: 1350,
    thicknessRange: [12, 180],
    mapCapable: true,
    moq: 750,
    leadTime: 6,
    onTimeDelivery: 98,
    badge: 'top_rated',
    description: 'Ultra-precision converter with cleanroom packaging line for fresh exports and MAP.',
    phone: '+91 98104 55123',
    email: 'info@novalaminates.com',
  },
  {
    id: 'conv-apex',
    name: 'Apex Polymer Films',
    location: 'Bawana Industrial Area, Delhi',
    distance: 18.5,
    rating: 4.7,
    totalOrders: 145,
    certifications: ['FSSAI', 'ISO 9001'],
    machines: ['Multi-layer Blown Extrusion', 'Flexo Printing', 'Side Sealing'],
    materials: ['LDPE', 'LLDPE', 'HDPE'],
    maxFilmWidth: 1600,
    thicknessRange: [25, 250],
    mapCapable: false,
    moq: 500,
    leadTime: 4,
    onTimeDelivery: 94,
    badge: 'verified',
    description: 'Bulk producer of breathable & ventilated liners for mandis and distribution centers.',
    phone: '+91 98991 88472',
    email: 'apexpolymer@delhifilm.com',
  },
  {
    id: 'conv-polysafe',
    name: 'PolySafe Packaging Ltd',
    location: 'Narela Industrial Area, Delhi',
    distance: 12.1,
    rating: 4.4,
    totalOrders: 167,
    certifications: ['BIS', 'FSSAI'],
    machines: ['Extrusion Coating', 'Pouch Making Machine'],
    materials: ['Paper/PE', 'BOPP', 'CPP'],
    maxFilmWidth: 1100,
    thicknessRange: [30, 160],
    mapCapable: false,
    moq: 1200,
    leadTime: 8,
    onTimeDelivery: 89,
    badge: 'verified',
    description: 'Specializes in moisture-resistant composite bags and paperboard liners.',
    phone: '+91 97112 00192',
    email: 'sales@polysafe.in',
  },
  {
    id: 'conv-sunrise',
    name: 'Sunrise Flexibles',
    location: 'Sector 25, Faridabad, Haryana',
    distance: 28.0,
    rating: 4.5,
    totalOrders: 110,
    certifications: ['ISO 22000', 'FSSAI'],
    machines: ['3-Layer Blown Film', 'Slitter Rewinder'],
    materials: ['LDPE', 'EVOH Blends', 'Nylon barrier'],
    maxFilmWidth: 1400,
    thicknessRange: [20, 180],
    mapCapable: true,
    moq: 600,
    leadTime: 7,
    onTimeDelivery: 91,
    badge: 'verified',
    description: 'Cold-chain oriented converter with high-barrier EVOH co-extrusion capabilities.',
    phone: '+91 99551 22891',
    email: 'orders@sunriseflexibles.com',
  },
  {
    id: 'conv-delhiext',
    name: 'Delhi Extrusions & Bags',
    location: 'Mayapuri Phase 1, New Delhi',
    distance: 21.0,
    rating: 4.6,
    totalOrders: 205,
    certifications: ['FSSAI', 'EPR Registered'],
    machines: ['Perforating Rollers', 'Gusset Bag Former'],
    materials: ['Recycled LDPE', 'Virgin LDPE', 'PP'],
    maxFilmWidth: 1250,
    thicknessRange: [25, 120],
    mapCapable: false,
    moq: 400,
    leadTime: 5,
    onTimeDelivery: 95,
    badge: 'verified',
    description: 'Fast-turnaround converter supplying ventilated fruit & vegetable crate liners.',
    phone: '+91 98188 77652',
    email: 'delhiextrusions@gmail.com',
  },
];

export interface MaterialItem {
  id: string;
  name: string;
  grade: string;
  producerId: string;
  producerName: string;
  otr: string;
  wvtr: string;
  pricePerKg: number;
  moqTonnes: number;
  widthRange: string;
  thicknessRange: string;
  leadTimeDays: number;
  certifications: string[];
  inStock: boolean;
  demandTrend: string;
  viewsThisWeek: number;
  inquiriesThisWeek: number;
}

export interface MaterialProducerProfile {
  id: string;
  name: string;
  location: string;
  rating: number;
  materials: MaterialItem[];
  certifications: string[];
  deliveryZones: string[];
  activeInquiriesCount: number;
  demandForecast: {
    material: string;
    trend: string;
    expectedPeak: string;
    reason: string;
  };
}

export const MOCK_MATERIAL_PRODUCERS: MaterialProducerProfile[] = [
  {
    id: 'mat-reliance',
    name: 'Reliance Polymers Division',
    location: 'Jamnagar, Gujarat',
    rating: 4.9,
    certifications: ['REACH', 'RoHS', 'Food Grade FDA', 'ISO 9001'],
    deliveryZones: ['Pan India', 'Delhi NCR Next-Day Hub'],
    activeInquiriesCount: 5,
    demandForecast: {
      material: 'LDPE Ventilated & Blown',
      trend: '+28%',
      expectedPeak: 'October (Banana Harvest)',
      reason: 'Northern state harvest cycles shifting to pre-perforated MAP film',
    },
    materials: [
      {
        id: 'mat-rel-ldpe',
        name: 'LDPE Film Grade — Relene 24FS040',
        grade: 'MFI 2.0 (High Clarity)',
        producerId: 'mat-reliance',
        producerName: 'Reliance Polymers Division',
        otr: '3,000–8,000 cc/m²/day',
        wvtr: '15–30 g/m²/day',
        pricePerKg: 92,
        moqTonnes: 2,
        widthRange: '600–1600 mm',
        thicknessRange: '20–150 µm',
        leadTimeDays: 4,
        certifications: ['FDA 21 CFR', 'IS 10146', 'REACH'],
        inStock: true,
        demandTrend: '+18% this month',
        viewsThisWeek: 420,
        inquiriesThisWeek: 14,
      },
      {
        id: 'mat-rel-hdpe',
        name: 'HDPE High Tenacity Film — Relene B56003',
        grade: 'MFI 0.3 (High Impact)',
        producerId: 'mat-reliance',
        producerName: 'Reliance Polymers Division',
        otr: '1,500–3,000 cc/m²/day',
        wvtr: '5–10 g/m²/day',
        pricePerKg: 88,
        moqTonnes: 3,
        widthRange: '800–1800 mm',
        thicknessRange: '15–100 µm',
        leadTimeDays: 5,
        certifications: ['FDA Food Grade', 'RoHS'],
        inStock: true,
        demandTrend: '+12% this month',
        viewsThisWeek: 290,
        inquiriesThisWeek: 9,
      },
      {
        id: 'mat-rel-bopp',
        name: 'Breathable BOPP Co-polymer Base',
        grade: 'Heat-sealable BOPP Base',
        producerId: 'mat-reliance',
        producerName: 'Reliance Polymers Division',
        otr: '1,200–2,200 cc/m²/day',
        wvtr: '4–7 g/m²/day',
        pricePerKg: 104,
        moqTonnes: 1.5,
        widthRange: '500–1400 mm',
        thicknessRange: '12–50 µm',
        leadTimeDays: 6,
        certifications: ['FSSAI', 'FDA 21 CFR'],
        inStock: true,
        demandTrend: '+34% this month',
        viewsThisWeek: 512,
        inquiriesThisWeek: 21,
      },
    ],
  },
  {
    id: 'mat-supreme',
    name: 'Supreme Petrochem Ltd',
    location: 'Raigad, Maharashtra',
    rating: 4.7,
    certifications: ['ISO 14001', 'FSSAI Approved Base'],
    deliveryZones: ['Pan India'],
    activeInquiriesCount: 3,
    demandForecast: {
      material: 'EVOH Barrier Resin',
      trend: '+34%',
      expectedPeak: 'November (Export Season)',
      reason: 'APEDA export mango & grape packaging compliance',
    },
    materials: [
      {
        id: 'mat-sup-evoh',
        name: 'EVOH Ultra-Barrier Masterbatch',
        grade: 'Eval 38% Ethylene Mol',
        producerId: 'mat-supreme',
        producerName: 'Supreme Petrochem Ltd',
        otr: '0.2–1.5 cc/m²/day',
        wvtr: '1.2–3.0 g/m²/day',
        pricePerKg: 285,
        moqTonnes: 0.5,
        widthRange: 'Resin / Pellets',
        thicknessRange: 'Trilayer barrier layer',
        leadTimeDays: 7,
        certifications: ['FDA Food Contact', 'EU 10/2011'],
        inStock: true,
        demandTrend: '+42% this month',
        viewsThisWeek: 640,
        inquiriesThisWeek: 26,
      },
    ],
  },
];

export interface SmartPlanOption {
  label: string;
  tag: string;
  material: string;
  shelfLife: number;
  cost: number;
  ecoScore: number;
  badgeColor: string;
  otr: string;
  wvtr: string;
  description: string;
}

export interface RecommendationTierData {
  costPlan: {
    material: string;
    otr: number;
    wvtr: number;
    thickness: number;
    sealMethod: string;
    mapSuitable: boolean;
    mapMix?: { O2: number; CO2: number; N2: number };
    shelfLifeDays: number;
    shelfLifeWithout: number;
    costPerBag: number;
    ecoScore: number;
    whyRecommended: string;
    spoilageReduced: string;
    options: Array<{
      title: string;
      material: string;
      cost: number;
      shelfLife: number;
      tag?: string;
    }>;
  };
  shelfLifePlan: {
    material: string;
    otr: number;
    wvtr: number;
    thickness: number;
    sealMethod: string;
    mapSuitable: boolean;
    mapMix: { O2: number; CO2: number; N2: number };
    shelfLifeDays: number;
    shelfLifeWithout: number;
    costPerBag: number;
    ecoScore: number;
    whyRecommended: string;
    spoilageReduced: string;
    options: Array<{
      title: string;
      material: string;
      cost: number;
      shelfLife: number;
      tag?: string;
    }>;
  };
  smartPlan: {
    options: SmartPlanOption[];
    paretoFrontier: Array<{ cost: number; shelfLife: number; name: string }>;
  };
}

export const AI_RECOMMENDATION_RULES: Record<string, RecommendationTierData> = {
  banana: {
    costPlan: {
      material: 'LDPE 30µm Ventilated Liner',
      otr: 4000,
      wvtr: 20,
      thickness: 30,
      sealMethod: 'Twist tie / Heat seal 115°C',
      mapSuitable: false,
      shelfLifeDays: 8,
      shelfLifeWithout: 5,
      costPerBag: 0.18,
      ecoScore: 6.2,
      spoilageReduced: '35% → 14%',
      whyRecommended: 'Minimal cost while enabling natural respiration through mechanical punched holes. Cuts moisture accumulation vs jute sacks.',
      options: [
        { title: 'Option A: LDPE 30µm Ventilated', material: 'Low-Density Polyethylene with 8 micro-punches', cost: 0.18, shelfLife: 8, tag: '★ Recommended' },
        { title: 'Option B: PP Woven Mesh Crate Wrap', material: 'Polypropylene Leno Mesh breathable liner', cost: 0.32, shelfLife: 7 },
        { title: 'Option C: Paper/PE Thin Coated Sheet', material: 'Kraft paper 40gsm + 10µm PE film', cost: 0.55, shelfLife: 8 },
      ],
    },
    shelfLifePlan: {
      material: '12µm PET + 40µm LDPE Co-ext Micro-perf',
      otr: 800,
      wvtr: 18,
      thickness: 52,
      sealMethod: 'Hermetic Heat Seal 135°C',
      mapSuitable: true,
      mapMix: { O2: 3, CO2: 6, N2: 91 },
      shelfLifeDays: 14,
      shelfLifeWithout: 5,
      costPerBag: 2.10,
      ecoScore: 7.2,
      spoilageReduced: '38% → 6%',
      whyRecommended: 'Laser micro-perforations tuned to Michaelis-Menten respiration kinetics delay climacteric starch-to-sugar ripening by 9 days.',
      options: [
        { title: 'Option A: PET/EVOH/PE Trilayer MAP', material: '12µ PET / 5µ EVOH / 45µ PE with calibrated laser holes', cost: 4.80, shelfLife: 18, tag: '★ Maximum Shelf Life' },
        { title: 'Option B: 12µm PET + 40µm LDPE Micro-perf', material: 'Biaxially oriented PET laminated to food-grade LDPE', cost: 2.10, shelfLife: 14, tag: 'Optimal Balance' },
        { title: 'Option C: Metalized PET / LDPE Barrier', material: '12µm Met-PET / 50µm LDPE (Opaque light barrier)', cost: 2.65, shelfLife: 15 },
      ],
    },
    smartPlan: {
      options: [
        {
          label: 'Budget Optimized',
          tag: 'Cost Champion',
          material: 'LDPE 40µm Laser Punched',
          shelfLife: 9,
          cost: 0.85,
          ecoScore: 6.8,
          badgeColor: 'border-green-500 bg-green-50 text-green-700',
          otr: '2,200 cc/m²/day',
          wvtr: '22 g/m²/day',
          description: 'Basic MAP environment at low manufacturing cost, suitable for domestic city retail delivery.',
        },
        {
          label: 'Balanced (Recommended)',
          tag: 'Best Value & ROI',
          material: '12µm PET + 40µm LDPE Micro-perf',
          shelfLife: 14,
          cost: 2.10,
          ecoScore: 7.2,
          badgeColor: 'border-amber-500 bg-amber-50 text-amber-800',
          otr: '800 cc/m²/day',
          wvtr: '18 g/m²/day',
          description: 'Delivers 14 days shelf life, 700% ROI, and unlocks reverse auction savings up to 22%.',
        },
        {
          label: 'Premium / Export',
          tag: 'Maximum Shelf Life',
          material: 'PET / EVOH / PE Trilayer (APEDA Grade)',
          shelfLife: 18,
          cost: 4.80,
          ecoScore: 4.2,
          badgeColor: 'border-blue-500 bg-blue-50 text-blue-700',
          otr: '120 cc/m²/day',
          wvtr: '8 g/m²/day',
          description: 'Export grade multi-barrier structure with active ethylene absorption patch for cold-chain sea voyages.',
        },
      ],
      paretoFrontier: [
        { cost: 0.18, shelfLife: 8, name: 'Ventilated LDPE' },
        { cost: 0.85, shelfLife: 9, name: 'Laser Punched LDPE' },
        { cost: 2.10, shelfLife: 14, name: 'PET/LDPE Micro-perf' },
        { cost: 3.60, shelfLife: 16, name: 'Bio-PLA MAP' },
        { cost: 4.80, shelfLife: 18, name: 'Trilayer EVOH' },
      ],
    },
  },
  mango: {
    costPlan: {
      material: 'HDPE 50µm Ventilated Crate Liner',
      otr: 2200,
      wvtr: 12,
      thickness: 50,
      sealMethod: 'Folded top closure',
      mapSuitable: false,
      shelfLifeDays: 8,
      shelfLifeWithout: 5,
      costPerBag: 0.35,
      ecoScore: 5.8,
      spoilageReduced: '30% → 15%',
      whyRecommended: 'Cushions Alphonso skins against abrasion while allowing heat and ethylene dissipation during local transit.',
      options: [
        { title: 'Option A: HDPE 50µm Mesh Liner', material: 'High-density polyethylene vented film', cost: 0.35, shelfLife: 8, tag: '★ Recommended' },
        { title: 'Option B: Corrugated Liner + LDPE', material: 'Fluted kraft with low-gauge poly liner', cost: 0.65, shelfLife: 9 },
        { title: 'Option C: Foam net + Jute wrap', material: 'EPE foam sleeve with breathable outer bag', cost: 0.90, shelfLife: 8 },
      ],
    },
    shelfLifePlan: {
      material: 'PET / EVOH / PE Trilayer Export Film',
      otr: 0.5,
      wvtr: 1.5,
      thickness: 69,
      sealMethod: 'Hermetic Impulse Seal 140°C',
      mapSuitable: true,
      mapMix: { O2: 3, CO2: 10, N2: 87 },
      shelfLifeDays: 26,
      shelfLifeWithout: 5,
      costPerBag: 14.80,
      ecoScore: 3.4,
      spoilageReduced: '42% → 4%',
      whyRecommended: 'Ultra-low OTR EVOH prevents oxidative softening and internal pulp breakdown. MAP holds climacteric peak during sea transit.',
      options: [
        { title: 'Option A: PET/EVOH/PE Trilayer', material: 'Trilayer barrier bag with MAP gas injection', cost: 14.80, shelfLife: 26, tag: '★ APEDA Approved' },
        { title: 'Option B: High Barrier BOPP Co-ex', material: 'Biaxially oriented polypropylene with PVDC coating', cost: 8.50, shelfLife: 18 },
        { title: 'Option C: Micro-perforated Chilled MAP', material: 'Polyolefin shrink with anti-fog additive', cost: 6.20, shelfLife: 15 },
      ],
    },
    smartPlan: {
      options: [
        {
          label: 'Domestic Mandi',
          tag: 'Budget Option',
          material: 'HDPE 50µm Ventilated Liner',
          shelfLife: 8,
          cost: 0.35,
          ecoScore: 6.0,
          badgeColor: 'border-green-500 bg-green-50 text-green-700',
          otr: '2,200 cc/m²/day',
          wvtr: '12 g/m²/day',
          description: 'Basic physical protection against pressure and skin abrasions for short hauls.',
        },
        {
          label: 'Inter-State Cold Chain',
          tag: 'Balanced & Recommended',
          material: 'Micro-perf BOPP / PE Laminate',
          shelfLife: 16,
          cost: 4.20,
          ecoScore: 6.9,
          badgeColor: 'border-amber-500 bg-amber-50 text-amber-800',
          otr: '450 cc/m²/day',
          wvtr: '9 g/m²/day',
          description: 'Prevents anthracnose black spot, maintains firmness for retail supermarkets.',
        },
        {
          label: 'Export Air/Sea Freight',
          tag: 'APEDA Gold Spec',
          material: 'PET / EVOH / PE Trilayer MAP',
          shelfLife: 26,
          cost: 14.80,
          ecoScore: 3.4,
          badgeColor: 'border-blue-500 bg-blue-50 text-blue-700',
          otr: '0.5 cc/m²/day',
          wvtr: '1.5 g/m²/day',
          description: 'Full export grade certification for Middle East and EU refrigerated container shipments.',
        },
      ],
      paretoFrontier: [
        { cost: 0.35, shelfLife: 8, name: 'Vented HDPE' },
        { cost: 2.10, shelfLife: 12, name: 'Perforated LDPE' },
        { cost: 4.20, shelfLife: 16, name: 'BOPP/PE MAP' },
        { cost: 9.50, shelfLife: 21, name: 'PVDC Co-ex' },
        { cost: 14.80, shelfLife: 26, name: 'EVOH Trilayer' },
      ],
    },
  },
  chips: {
    costPlan: {
      material: 'BOPP 25µm Metallized Single Layer',
      otr: 3,
      wvtr: 1,
      thickness: 25,
      sealMethod: 'Heat seal 125°C',
      mapSuitable: true,
      mapMix: { O2: 0, CO2: 0, N2: 100 },
      shelfLifeDays: 60,
      shelfLifeWithout: 15,
      costPerBag: 1.20,
      ecoScore: 4.8,
      spoilageReduced: '45% rancidity → 5%',
      whyRecommended: 'N2 flushing prevents lipid peroxidation. Metallized BOPP delivers adequate barrier at entry-level budget.',
      options: [
        { title: 'Option A: BOPP 25µm Metallized', material: 'Vacuum metallized BOPP film', cost: 1.20, shelfLife: 60, tag: '★ Recommended' },
        { title: 'Option B: Transparent BOPP/CPP', material: 'Co-extruded clear snack film', cost: 0.95, shelfLife: 35 },
        { title: 'Option C: Kraft/PE Barrier Pouch', material: 'Bio-laminated paper pouch', cost: 2.10, shelfLife: 50 },
      ],
    },
    shelfLifePlan: {
      material: '12µm PET / 9µm Al Foil / 40µm PE',
      otr: 0.05,
      wvtr: 0.05,
      thickness: 61,
      sealMethod: 'Continuous Jaw Heat Seal 160°C',
      mapSuitable: true,
      mapMix: { O2: 0, CO2: 0, N2: 100 },
      shelfLifeDays: 180,
      shelfLifeWithout: 15,
      costPerBag: 3.40,
      ecoScore: 2.8,
      spoilageReduced: 'Zero rancidity up to 6 months',
      whyRecommended: 'True zero-transmission aluminum foil barrier blocks 100% UV photons, oxygen, and water vapor.',
      options: [
        { title: 'Option A: PET / Al Foil / PE', material: '3-Ply foil laminate pouch', cost: 3.40, shelfLife: 180, tag: '★ Maximum Shield' },
        { title: 'Option B: PET / Met-PET / PE', material: 'Dual metallized barrier pouch', cost: 2.40, shelfLife: 120 },
        { title: 'Option C: High-Barrier EVOH Pouch', material: 'Recyclable high-barrier mono-material', cost: 2.90, shelfLife: 110 },
      ],
    },
    smartPlan: {
      options: [
        {
          label: 'Local Snack Retail',
          tag: 'Quick Turnover',
          material: 'BOPP 25µm Metallized',
          shelfLife: 60,
          cost: 1.20,
          ecoScore: 4.8,
          badgeColor: 'border-green-500 bg-green-50 text-green-700',
          otr: '3 cc/m²/day',
          wvtr: '1 g/m²/day',
          description: 'Best for local retail with turnover under 60 days.',
        },
        {
          label: 'Regional FMCG Distribution',
          tag: 'Recommended Value',
          material: '12µm PET / 18µm Met-BOPP / 35µm PE',
          shelfLife: 120,
          cost: 2.20,
          ecoScore: 4.1,
          badgeColor: 'border-amber-500 bg-amber-50 text-amber-800',
          otr: '0.8 cc/m²/day',
          wvtr: '0.3 g/m²/day',
          description: 'Crispness retention across temperature swings with reverse auction supplier bidding.',
        },
        {
          label: 'National Brand / Export',
          tag: 'Zero Compromise',
          material: 'PET / Al Foil / PE Hermetic',
          shelfLife: 180,
          cost: 3.40,
          ecoScore: 2.8,
          badgeColor: 'border-blue-500 bg-blue-50 text-blue-700',
          otr: '0.05 cc/m²/day',
          wvtr: '0.05 g/m²/day',
          description: 'Export-grade packaging resisting harsh humid monsoons and long shipping cycles.',
        },
      ],
      paretoFrontier: [
        { cost: 0.95, shelfLife: 35, name: 'Clear BOPP' },
        { cost: 1.20, shelfLife: 60, name: 'Met-BOPP' },
        { cost: 2.20, shelfLife: 120, name: 'PET/Met-BOPP' },
        { cost: 2.90, shelfLife: 140, name: 'Mono PE Barrier' },
        { cost: 3.40, shelfLife: 180, name: 'PET/Foil/PE' },
      ],
    },
  },
  tomato: {
    costPlan: {
      material: 'LDPE 45µm Anti-Fog Macro-perf',
      otr: 3200,
      wvtr: 24,
      thickness: 45,
      sealMethod: 'Heat seal 120°C',
      mapSuitable: false,
      shelfLifeDays: 9,
      shelfLifeWithout: 4,
      costPerBag: 0.28,
      ecoScore: 6.5,
      spoilageReduced: '32% rot → 10%',
      whyRecommended: 'Anti-fog prevents water droplet formation that triggers Botrytis mold.',
      options: [
        { title: 'Option A: LDPE Anti-Fog Macro-perf', material: 'Vented anti-fog poly bag', cost: 0.28, shelfLife: 9, tag: '★ Recommended' },
        { title: 'Option B: Recycled Poly Mesh', material: 'Knitted HDPE mesh sack', cost: 0.22, shelfLife: 6 },
      ],
    },
    shelfLifePlan: {
      material: 'BOPP Anti-Fog Micro-perforated MAP',
      otr: 1200,
      wvtr: 14,
      thickness: 35,
      sealMethod: 'Continuous Band Seal 130°C',
      mapSuitable: true,
      mapMix: { O2: 4, CO2: 5, N2: 91 },
      shelfLifeDays: 16,
      shelfLifeWithout: 4,
      costPerBag: 1.85,
      ecoScore: 7.0,
      spoilageReduced: '35% → 5%',
      whyRecommended: 'Optimized CO2 equilibrium delays lycopene degradation and wall softening.',
      options: [
        { title: 'Option A: BOPP Micro-perf MAP', material: 'Anti-fog MAP film pouch', cost: 1.85, shelfLife: 16, tag: '★ Optimal' },
        { title: 'Option B: PET Clamshell + Pad', material: 'Rigid vented PET punnet', cost: 3.10, shelfLife: 14 },
      ],
    },
    smartPlan: {
      options: [
        {
          label: 'Economy Mandi Bag',
          tag: 'Low Cost',
          material: 'LDPE 45µm Anti-Fog',
          shelfLife: 9,
          cost: 0.28,
          ecoScore: 6.5,
          badgeColor: 'border-green-500 bg-green-50 text-green-700',
          otr: '3,200 cc/m²/day',
          wvtr: '24 g/m²/day',
          description: 'Anti-fog coating prevents internal condensation and mold growth.',
        },
        {
          label: 'Supermarket MAP Bag',
          tag: 'Balanced Choice',
          material: 'BOPP Anti-Fog Micro-perf',
          shelfLife: 16,
          cost: 1.85,
          ecoScore: 7.0,
          badgeColor: 'border-amber-500 bg-amber-50 text-amber-800',
          otr: '1,200 cc/m²/day',
          wvtr: '14 g/m²/day',
          description: 'Maintains firmness and glossy red skin appearance for retail shelf appeal.',
        },
        {
          label: 'Export Punnet with Barrier Film',
          tag: 'Max Protection',
          material: 'RPET Punnet + Laser Film Top',
          shelfLife: 20,
          cost: 3.80,
          ecoScore: 7.8,
          badgeColor: 'border-blue-500 bg-blue-50 text-blue-700',
          otr: '600 cc/m²/day',
          wvtr: '10 g/m²/day',
          description: 'Zero mechanical crush damage in stackable master cartons.',
        },
      ],
      paretoFrontier: [
        { cost: 0.22, shelfLife: 6, name: 'Mesh Sack' },
        { cost: 0.28, shelfLife: 9, name: 'Anti-fog LDPE' },
        { cost: 1.85, shelfLife: 16, name: 'BOPP MAP' },
        { cost: 3.80, shelfLife: 20, name: 'RPET Punnet' },
      ],
    },
  },
};

// ==========================================
// LIVE AUCTION & BIDDING DATA
// ==========================================

export interface LiveBid {
  id: string;
  rank: number;
  converterId: string;
  converterName: string;
  bidPerBag: number;
  leadTimeDays: number;
  moqUnits: number;
  timestamp: string;
  technicalCompliant: boolean;
  notes: string;
  isMyBid?: boolean;
}

export const MOCK_LIVE_AUCTION = {
  auctionId: 'auc-smart-ban-091',
  projectId: 'proj-banana-1',
  commodityName: 'Banana (Cavendish)',
  batchQuantityUnits: 500,
  packagingSpec: '12µm PET + 40µm LDPE Micro-perforated',
  budgetCeiling: 2.50,
  currentLowestBid: 1.72,
  savingsPercent: 31,
  savingsAmount: 0.78,
  timeRemainingSec: 15796, // 04:23:16
  status: 'LIVE',
  bids: [
    { id: 'b-1', rank: 1, converterId: 'conv-nova', converterName: 'Nova Laminates & Pouches', bidPerBag: 1.72, leadTimeDays: 6, moqUnits: 500, timestamp: '14 mins ago', technicalCompliant: true, notes: 'Direct factory rate, laser micro-perf online' },
    { id: 'b-2', rank: 2, converterId: 'conv-greenpack', converterName: 'GreenPack Films Pvt Ltd', bidPerBag: 1.86, leadTimeDays: 7, moqUnits: 500, timestamp: '28 mins ago', technicalCompliant: true, notes: 'FSSAI cert included + tamper evident seal' },
    { id: 'b-3', rank: 3, converterId: 'conv-delhiext', converterName: 'Delhi Extrusions & Bags', bidPerBag: 1.98, leadTimeDays: 5, moqUnits: 500, timestamp: '45 mins ago', technicalCompliant: true, notes: 'Fast 5-day dispatch from Mayapuri' },
    { id: 'b-4', rank: 4, converterId: 'conv-pactech', converterName: 'PacTech Industries', bidPerBag: 2.10, leadTimeDays: 5, moqUnits: 1000, timestamp: '1 hour ago', technicalCompliant: true, notes: 'High tensile seal formulation' },
    { id: 'b-5', rank: 5, converterId: 'conv-apex', converterName: 'Apex Polymer Films', bidPerBag: 2.24, leadTimeDays: 4, moqUnits: 500, timestamp: '2 hours ago', technicalCompliant: true, notes: 'Free delivery to Sonipat packhouse' },
    { id: 'b-6', rank: 6, converterId: 'conv-sunrise', converterName: 'Sunrise Flexibles', bidPerBag: 2.35, leadTimeDays: 7, moqUnits: 600, timestamp: '3 hours ago', technicalCompliant: true, notes: 'Includes puncture resistance guarantee' },
  ] as LiveBid[],
};

// ==========================================
// CONVERTER RFQs LIST
// ==========================================

export interface ConverterRFQItem {
  id: string;
  rfqNumber: string;
  commodityName: string;
  commodityEmoji: string;
  quantityUnits: number;
  tier: 'cost' | 'shelf_life' | 'smart';
  specRequirement: string;
  otrRequired: string;
  wvtrRequired: string;
  distanceKm: number;
  farmerLocation: string;
  farmerName: string;
  dueInHours: number;
  matchScore: number;
  status: 'not_quoted' | 'bidding_now' | 'won' | 'lost';
  myQuotePrice?: number;
  lowestCurrentBid?: number;
}

export const MOCK_CONVERTER_RFQS: ConverterRFQItem[] = [
  {
    id: 'crfq-1',
    rfqNumber: 'RFQ-2026-BAN-881',
    commodityName: 'Banana (Cavendish)',
    commodityEmoji: '🍌',
    quantityUnits: 500,
    tier: 'smart',
    specRequirement: '12µm PET + 40µm LDPE micro-perforated (MAP)',
    otrRequired: '800–2,000 cc/m²/day',
    wvtrRequired: '10–25 g/m²/day',
    distanceKm: 8.2,
    farmerLocation: 'Sonipat, Haryana',
    farmerName: 'Rajesh Kumar (GreenField FPO)',
    dueInHours: 4,
    matchScore: 96,
    status: 'bidding_now',
    myQuotePrice: 1.86,
    lowestCurrentBid: 1.72,
  },
  {
    id: 'crfq-2',
    rfqNumber: 'RFQ-2026-MGO-104',
    commodityName: 'Mango (Alphonso Export)',
    commodityEmoji: '🥭',
    quantityUnits: 2500,
    tier: 'shelf_life',
    specRequirement: 'PET / EVOH / PE Trilayer high-barrier pouch',
    otrRequired: '0.5–1.0 cc/m²/day',
    wvtrRequired: '1.0–2.0 g/m²/day',
    distanceKm: 14.1,
    farmerLocation: 'Ratnagiri / Azadpur Hub',
    farmerName: 'Kalyani Orchards Pvt Ltd',
    dueInHours: 18,
    matchScore: 91,
    status: 'not_quoted',
  },
  {
    id: 'crfq-3',
    rfqNumber: 'RFQ-2026-TOM-319',
    commodityName: 'Tomato',
    commodityEmoji: '🍅',
    quantityUnits: 1200,
    tier: 'cost',
    specRequirement: '45µm Anti-fog LDPE with punching',
    otrRequired: '3,000+ cc/m²/day',
    wvtrRequired: '20+ g/m²/day',
    distanceKm: 11.0,
    farmerLocation: 'Nuh, Haryana',
    farmerName: 'Mewat Vegetable Cooperative',
    dueInHours: 8,
    matchScore: 89,
    status: 'not_quoted',
  },
  {
    id: 'crfq-4',
    rfqNumber: 'RFQ-2026-GRP-772',
    commodityName: 'Grapes (Thompson)',
    commodityEmoji: '🍇',
    quantityUnits: 3000,
    tier: 'smart',
    specRequirement: 'BOPP Ventilated Pouch with SO2 Pad Pocket',
    otrRequired: '1,500 cc/m²/day',
    wvtrRequired: '12 g/m²/day',
    distanceKm: 22.5,
    farmerLocation: 'Nashik / Delhi Depot',
    farmerName: 'Sahyadri Farmers Club',
    dueInHours: 0,
    matchScore: 95,
    status: 'won',
    myQuotePrice: 2.45,
  },
  {
    id: 'crfq-5',
    rfqNumber: 'RFQ-2026-POT-401',
    commodityName: 'Potato Chips',
    commodityEmoji: '🥔',
    quantityUnits: 10000,
    tier: 'cost',
    specRequirement: '25µm Metallized BOPP pouch roll',
    otrRequired: '3 cc/m²/day',
    wvtrRequired: '1 g/m²/day',
    distanceKm: 34.0,
    farmerLocation: 'Aligarh, UP',
    farmerName: 'Krishi Foods Namkeen',
    dueInHours: 0,
    matchScore: 78,
    status: 'lost',
    myQuotePrice: 1.35,
  },
];

// ==========================================
// TRANSPORTER SHIPMENTS DATA
// ==========================================

export interface TransporterShipment {
  id: string;
  shipmentCode: string;
  commodityName: string;
  commodityEmoji: string;
  source: string;
  destination: string;
  distanceKm: number;
  durationHours: number;
  vehicleType: 'Ambient Truck' | 'Reefer Van (2-8°C)' | 'Deep Reefer (-18°C)';
  packagingType: string;
  currentTemp: number;
  targetTempRange: string;
  status: 'In Transit' | 'Pickup Scheduled' | 'Delivered' | 'Breach Alert';
  gpsLocation: string;
  tempAlertMessage?: string;
  complianceCertGenerated: boolean;
}

export const MOCK_TRANSPORTER_SHIPMENTS: TransporterShipment[] = [
  {
    id: 'ship-1',
    shipmentCode: 'PKU-2026-084',
    commodityName: 'Banana (Cavendish)',
    commodityEmoji: '🍌',
    source: 'Sonipat Packhouse, Haryana',
    destination: 'Azadpur APMC Mandi, Delhi',
    distanceKm: 54,
    durationHours: 3.5,
    vehicleType: 'Reefer Van (2-8°C)',
    packagingType: '12µm PET + 40µm LDPE Micro-perf MAP',
    currentTemp: 16.8,
    targetTempRange: '13–15°C',
    status: 'Breach Alert',
    gpsLocation: 'Near Kundli Toll Plaza (NH-44)',
    tempAlertMessage: 'Cold chain threshold exceeded: +1.8°C above optimal window for 42 minutes.',
    complianceCertGenerated: true,
  },
  {
    id: 'ship-2',
    shipmentCode: 'PKU-2026-112',
    commodityName: 'Tomato Premium',
    commodityEmoji: '🍅',
    source: 'Mewat Aggregation Center',
    destination: 'Reliance Fresh Distribution Center, Gurugram',
    distanceKm: 88,
    durationHours: 4.2,
    vehicleType: 'Reefer Van (2-8°C)',
    packagingType: 'Anti-Fog Macro-perf LDPE Bags',
    currentTemp: 11.2,
    targetTempRange: '10–12°C',
    status: 'In Transit',
    gpsLocation: 'Sohna Elevated Corridor, Km 14',
    complianceCertGenerated: true,
  },
];

// ==========================================
// ENTERPRISE / PACKHOUSE ANALYTICS DATA
// ==========================================

export interface PackhouseAnalytics {
  activeProjectsCount: number;
  monthlyPackagingSpend: number;
  averageSpoilageRate: number; // e.g. 4.2%
  spoilageReductionPercent: number; // e.g. 18%
  aiAccuracyScore: number; // e.g. 91%
  carbonFootprintKgCO2: number; // 284
  conventionalCarbonKgCO2: number; // 410
  carbonReductionPercent: number; // 31%
  commodityComparison: Array<{
    commodity: string;
    packagingCostPerKg: number;
    shelfLifeTargetDays: number;
    shelfLifeActualDays: number;
    spoilagePercent: number;
  }>;
  supplierPerformance: Array<{
    name: string;
    orders: number;
    onTimePercent: number;
    rating: number;
    avgLeadTimeDays: number;
  }>;
  complianceSummary: {
    fssaiStatus: 'Compliant' | 'Pending';
    pwm2022EprDueInDays: number;
    agmarkStatus: 'Compliant' | 'Pending';
    exportCertStatus: 'Not Set Up' | 'Active';
  };
}

export const MOCK_ANALYTICS_DATA: PackhouseAnalytics = {
  activeProjectsCount: 4,
  monthlyPackagingSpend: 48340,
  averageSpoilageRate: 4.2,
  spoilageReductionPercent: 18,
  aiAccuracyScore: 91,
  carbonFootprintKgCO2: 284,
  conventionalCarbonKgCO2: 410,
  carbonReductionPercent: 31,
  commodityComparison: [
    { commodity: 'Banana (Cavendish)', packagingCostPerKg: 2.10, shelfLifeTargetDays: 12, shelfLifeActualDays: 14, spoilagePercent: 3.8 },
    { commodity: 'Mango (Alphonso)', packagingCostPerKg: 14.80, shelfLifeTargetDays: 24, shelfLifeActualDays: 26, spoilagePercent: 4.1 },
    { commodity: 'Tomato Hybrid', packagingCostPerKg: 1.85, shelfLifeTargetDays: 15, shelfLifeActualDays: 16, spoilagePercent: 5.2 },
    { commodity: 'Grapes (Thompson)', packagingCostPerKg: 4.20, shelfLifeTargetDays: 20, shelfLifeActualDays: 21, spoilagePercent: 3.5 },
  ],
  supplierPerformance: [
    { name: 'GreenPack Films', orders: 12, onTimePercent: 100, rating: 4.8, avgLeadTimeDays: 6.2 },
    { name: 'PacTech Industries', orders: 8, onTimePercent: 87, rating: 4.3, avgLeadTimeDays: 4.8 },
    { name: 'Nova Laminates', orders: 15, onTimePercent: 98, rating: 4.9, avgLeadTimeDays: 5.5 },
    { name: 'EcoFilm Solutions', orders: 5, onTimePercent: 92, rating: 4.4, avgLeadTimeDays: 9.0 },
  ],
  complianceSummary: {
    fssaiStatus: 'Compliant',
    pwm2022EprDueInDays: 14,
    agmarkStatus: 'Compliant',
    exportCertStatus: 'Not Set Up',
  },
};

