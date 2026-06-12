export interface Transaction {
  id: string;
  date: string;
  region: string;
  country: string;
  category: string;
  product: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
  cost: number;
  profit: number;
  profitMargin: number;
  customerSegment: string;
  paymentMethod: string;
  discount: number;
  shippingCost: number;
  orderStatus: string;
  salesRep: string;
}

const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
  "Oceania",
];

const countriesByRegion: Record<string, string[]> = {
  "North America": ["United States", "Canada", "Mexico"],
  Europe: ["Germany", "United Kingdom", "France", "Italy", "Spain", "Netherlands", "Poland"],
  "Asia Pacific": ["China", "Japan", "India", "South Korea", "Australia", "Singapore", "Thailand"],
  "Latin America": ["Brazil", "Argentina", "Chile", "Colombia", "Peru"],
  "Middle East & Africa": ["South Africa", "UAE", "Saudi Arabia", "Nigeria", "Egypt", "Kenya"],
  Oceania: ["Australia", "New Zealand", "Fiji", "Papua New Guinea"],
};

const categories = [
  "Electronics",
  "Clothing & Apparel",
  "Home & Garden",
  "Sports & Outdoors",
  "Books & Media",
  "Beauty & Personal Care",
  "Toys & Games",
  "Food & Beverage",
  "Automotive",
  "Health & Wellness",
];

const productsByCategory: Record<string, string[]> = {
  Electronics: [
    "Wireless Headphones Pro",
    "Smart Watch Ultra",
    "4K LED Smart TV 55\"",
    "Gaming Laptop RTX",
    "Bluetooth Speaker Max",
    "Tablet Pro 12.9\"",
    "Smartphone X Pro",
    "Wireless Earbuds Elite",
    "Digital Camera 4K",
    "Drone Phantom 4",
  ],
  "Clothing & Apparel": [
    "Designer Denim Jacket",
    "Running Shoes Elite",
    "Cotton T-Shirt Pack",
    "Winter Parka Premium",
    "Silk Scarf Collection",
    "Leather Boots Classic",
    "Athletic Wear Set",
    "Formal Suit Premium",
    "Summer Dress Floral",
    "Baseball Cap Vintage",
  ],
  "Home & Garden": [
    "Smart Thermostat",
    "Robot Vacuum Pro",
    "Patio Furniture Set",
    "LED Grow Light System",
    "Memory Foam Mattress",
    "Kitchen Mixer Deluxe",
    "Air Purifier HEPA",
    "Smart Door Lock",
    "Garden Tool Set",
    "Ceramic Cookware Set",
  ],
  "Sports & Outdoors": [
    "Mountain Bike Pro",
    "Yoga Mat Premium",
    "Tennis Racket Elite",
    "Camping Tent 4-Person",
    "Fitness Tracker Band",
    "Kayak Inflatable",
    "Golf Club Set",
    "Basketball Hoop Pro",
    "Hiking Backpack 65L",
    "Swimming Goggles Pro",
  ],
  "Books & Media": [
    "Bestseller Novel Collection",
    "Online Course Bundle",
    "Music Streaming Annual",
    "Art History Encyclopedia",
    "Cookbook Masterclass",
    "Sci-Fi Box Set",
    "Business Strategy Guide",
    "Photography Tutorial",
    "Language Learning App",
    "Documentary Collection",
  ],
  "Beauty & Personal Care": [
    "Anti-Aging Serum",
    "Organic Shampoo Set",
    "Perfume Collection",
    "Skincare Routine Kit",
    "Hair Dryer Professional",
    "Makeup Palette Pro",
    "Electric Toothbrush",
    "Sunscreen SPF 50",
    "Beard Grooming Kit",
    "Nail Polish Set",
  ],
  "Toys & Games": [
    "Building Blocks Set",
    "Board Game Strategy",
    "Remote Control Car",
    "Dollhouse Deluxe",
    "Puzzle 5000 Pieces",
    "Science Experiment Kit",
    "Video Game Console",
    "Stuffed Animal Giant",
    "Art Supply Set",
    "Musical Instrument Toy",
  ],
  "Food & Beverage": [
    "Organic Coffee Beans",
    "Gourmet Chocolate Box",
    "Premium Olive Oil",
    "Wine Selection Case",
    "Protein Powder Whey",
    "Snack Variety Pack",
    "Tea Collection Gift",
    "Honey Raw Organic",
    "Spice Rack Set",
    "Energy Drink Pack",
  ],
  Automotive: [
    "Car Dash Cam 4K",
    "Tire Pressure Monitor",
    "GPS Navigation System",
    "Car Vacuum Cleaner",
    "Seat Covers Leather",
    "Jump Starter Power",
    "Floor Mats All-Weather",
    "Bluetooth Car Adapter",
    "Roof Cargo Box",
    "LED Headlight Kit",
  ],
  "Health & Wellness": [
    "Blood Pressure Monitor",
    "Massage Gun Pro",
    "Vitamin D3 Supplement",
    "Weight Scale Smart",
    "First Aid Kit Deluxe",
    "Sleep Aid Device",
    "Resistance Bands Set",
    "TENS Unit Therapy",
    "Omega-3 Fish Oil",
    "Posture Corrector",
  ],
};

const customerSegments = ["Enterprise", "SMB", "Consumer", "Government"];
const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Crypto", "Cash on Delivery"];
const orderStatuses = ["Delivered", "Shipped", "Processing", "Cancelled", "Returned"];
const salesReps = [
  "Alex Morgan",
  "Sarah Chen",
  "James Wilson",
  "Maria Garcia",
  "David Kim",
  "Emma Thompson",
  "Carlos Rodriguez",
  "Priya Patel",
  "Liam O'Brien",
  "Yuki Tanaka",
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDate(year: number, month: number): string {
  const day = randomInt(1, 28);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function generateData(count: number = 1200): Transaction[] {
  const data: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const month = randomInt(1, 12);
    const region = randomChoice(regions);
    const country = randomChoice(countriesByRegion[region]);
    const category = randomChoice(categories);
    const product = randomChoice(productsByCategory[category]);
    const quantity = randomInt(1, 50);
    const basePrice = randomFloat(15, 1200);
    const discount = randomChoice([0, 0, 0, 5, 10, 15, 20, 25]);
    const unitPrice = parseFloat((basePrice * (1 - discount / 100)).toFixed(2));
    const revenue = parseFloat((unitPrice * quantity).toFixed(2));
    const cost = parseFloat((basePrice * 0.55 * quantity).toFixed(2));
    const profit = parseFloat((revenue - cost).toFixed(2));
    const profitMargin = parseFloat(((profit / revenue) * 100).toFixed(1));
    const shippingCost = parseFloat((randomFloat(5, 50) * (quantity > 10 ? 0.7 : 1)).toFixed(2));

    data.push({
      id: `ORD-${2024}-${String(i + 1).padStart(6, "0")}`,
      date: generateDate(2024, month),
      region,
      country,
      category,
      product,
      quantity,
      unitPrice,
      revenue,
      cost,
      profit,
      profitMargin,
      customerSegment: randomChoice(customerSegments),
      paymentMethod: randomChoice(paymentMethods),
      discount,
      shippingCost,
      orderStatus: randomChoice(orderStatuses),
      salesRep: randomChoice(salesReps),
    });
  }

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export const allData = generateData(1500);

export const regionsList = regions;
export const categoriesList = categories;
export const segmentsList = customerSegments;
export const statusesList = orderStatuses;
export const paymentMethodsList = paymentMethods;
export const salesRepsList = salesReps;

export function getFilteredData(
  data: Transaction[],
  filters: {
    dateFrom?: string;
    dateTo?: string;
    regions?: string[];
    categories?: string[];
    segments?: string[];
    statuses?: string[];
    searchQuery?: string;
  }
): Transaction[] {
  return data.filter((item) => {
    if (filters.dateFrom && item.date < filters.dateFrom) return false;
    if (filters.dateTo && item.date > filters.dateTo) return false;
    if (filters.regions?.length && !filters.regions.includes(item.region)) return false;
    if (filters.categories?.length && !filters.categories.includes(item.category)) return false;
    if (filters.segments?.length && !filters.segments.includes(item.customerSegment)) return false;
    if (filters.statuses?.length && !filters.statuses.includes(item.orderStatus)) return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        item.id.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.salesRep.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

export function aggregateByRegion(data: Transaction[]) {
  const map = new Map<string, { revenue: number; profit: number; orders: number }>();
  data.forEach((d) => {
    const curr = map.get(d.region) || { revenue: 0, profit: 0, orders: 0 };
    curr.revenue += d.revenue;
    curr.profit += d.profit;
    curr.orders += 1;
    map.set(d.region, curr);
  });
  return Array.from(map.entries()).map(([name, val]) => ({
    name,
    revenue: parseFloat(val.revenue.toFixed(0)),
    profit: parseFloat(val.profit.toFixed(0)),
    orders: val.orders,
  }));
}

export function aggregateByCategory(data: Transaction[]) {
  const map = new Map<string, { revenue: number; profit: number }>();
  data.forEach((d) => {
    const curr = map.get(d.category) || { revenue: 0, profit: 0 };
    curr.revenue += d.revenue;
    curr.profit += d.profit;
    map.set(d.category, curr);
  });
  return Array.from(map.entries()).map(([name, val]) => ({
    name,
    revenue: parseFloat(val.revenue.toFixed(0)),
    profit: parseFloat(val.profit.toFixed(0)),
  }));
}

export function aggregateByMonth(data: Transaction[]) {
  const map = new Map<string, { revenue: number; profit: number; orders: number }>();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  data.forEach((d) => {
    const monthIdx = parseInt(d.date.split("-")[1]) - 1;
    const monthName = months[monthIdx];
    const curr = map.get(monthName) || { revenue: 0, profit: 0, orders: 0 };
    curr.revenue += d.revenue;
    curr.profit += d.profit;
    curr.orders += 1;
    map.set(monthName, curr);
  });
  return months.map((m) => ({
    name: m,
    revenue: parseFloat((map.get(m)?.revenue || 0).toFixed(0)),
    profit: parseFloat((map.get(m)?.profit || 0).toFixed(0)),
    orders: map.get(m)?.orders || 0,
  }));
}

export function getTopProducts(data: Transaction[], limit: number = 5) {
  const map = new Map<string, { revenue: number; quantity: number; profit: number }>();
  data.forEach((d) => {
    const curr = map.get(d.product) || { revenue: 0, quantity: 0, profit: 0 };
    curr.revenue += d.revenue;
    curr.quantity += d.quantity;
    curr.profit += d.profit;
    map.set(d.product, curr);
  });
  return Array.from(map.entries())
    .map(([name, val]) => ({
      name,
      revenue: parseFloat(val.revenue.toFixed(0)),
      quantity: val.quantity,
      profit: parseFloat(val.profit.toFixed(0)),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

export function getTopSalesReps(data: Transaction[], limit: number = 8) {
  const map = new Map<string, { revenue: number; orders: number }>();
  data.forEach((d) => {
    const curr = map.get(d.salesRep) || { revenue: 0, orders: 0 };
    curr.revenue += d.revenue;
    curr.orders += 1;
    map.set(d.salesRep, curr);
  });
  return Array.from(map.entries())
    .map(([name, val]) => ({
      name,
      revenue: parseFloat(val.revenue.toFixed(0)),
      orders: val.orders,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

export function getSegmentDistribution(data: Transaction[]) {
  const map = new Map<string, number>();
  data.forEach((d) => {
    map.set(d.customerSegment, (map.get(d.customerSegment) || 0) + d.revenue);
  });
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(0)),
  }));
}

export function getPaymentDistribution(data: Transaction[]) {
  const map = new Map<string, number>();
  data.forEach((d) => {
    map.set(d.paymentMethod, (map.get(d.paymentMethod) || 0) + 1);
  });
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getStatusDistribution(data: Transaction[]) {
  const map = new Map<string, number>();
  data.forEach((d) => {
    map.set(d.orderStatus, (map.get(d.orderStatus) || 0) + 1);
  });
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getDateRange(data: Transaction[]) {
  if (data.length === 0) return { minDate: "2024-01-01", maxDate: "2024-12-31" };
  const dates = data.map((d) => d.date).sort();
  return { minDate: dates[0], maxDate: dates[dates.length - 1] };
}

export function calculateKPIs(data: Transaction[]) {
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);
  const totalOrders = data.length;
  const totalQuantity = data.reduce((sum, d) => sum + d.quantity, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const avgProfitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const totalShipping = data.reduce((sum, d) => sum + d.shippingCost, 0);
  const uniqueCustomers = new Set(data.map((d) => d.id.split("-")[2])).size;

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(0)),
    totalProfit: parseFloat(totalProfit.toFixed(0)),
    totalOrders,
    totalQuantity,
    avgOrderValue: parseFloat(avgOrderValue.toFixed(2)),
    avgProfitMargin: parseFloat(avgProfitMargin.toFixed(1)),
    totalShipping: parseFloat(totalShipping.toFixed(0)),
    uniqueCustomers,
  };
}
