export const site = {
  name: "Brooklyn Auto Sales",
  tagline: "Quality Pre-Owned Vehicles in Staten Island",
  phone: "718-825-4678",
  phoneLink: "tel:7188254678",
  address: "161 Marion St",
  city: "Staten Island",
  state: "NY",
  zip: "10310",
  fullAddress: "161 Marion St, Staten Island, NY 10310",
  website: "https://brooklynautoonline.com",
  description:
    "Let Brooklyn Auto Sales show you how easy it is to buy a quality used car in Staten Island. We believe fair prices, superior service, and treating customers right leads to satisfied repeat buyers.",
  about:
    "Our friendly and knowledgeable sales staff is here to help you find the car you deserve, priced to fit your budget. Shop our virtual showroom of used cars, trucks and SUVs online then stop by for a test drive.",
  hours: [
    { day: "Monday", hours: "10:00 AM – 6:30 PM" },
    { day: "Tuesday", hours: "10:00 AM – 6:30 PM" },
    { day: "Wednesday", hours: "10:00 AM – 6:30 PM" },
    { day: "Thursday", hours: "10:00 AM – 6:30 PM" },
    { day: "Friday", hours: "10:00 AM – 5:30 PM" },
    { day: "Saturday", hours: "Appointment Only" },
    { day: "Sunday", hours: "Appointment Only" },
  ],
  banners: [
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/257e3f2d.jpg",
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/efe12363.jpg",
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/b2a06a09.jpg",
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/55b3e7b2.jpg",
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/1807232d.jpg",
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/ef2fffc4.jpg",
    "https://imagescdn.dealercarsearch.com/DealerImages/1483/saved/78a165d9.JPG",
  ],
  links: {
    inventory: "/inventory",
    financing: "/financing",
    loanCalculator: "/financing/loan-calculator",
    sellCar: "/sell-my-car",
    tradeIn: "/trade-in",
    testimonials: "/testimonials",
    about: "/about",
    store: "/store",
    privacy: "/privacy",
    directions: "/directions",
    admin: "/admin",
    vehicleFinder: "/vehicle-finder",
  },
  external: {
    creditApp: "https://brooklynautoonline.com/creditapp",
    tradeForm: "https://brooklynautoonline.com/trade",
    sellForm: "https://brooklynautoonline.com/we-buy-vehicle",
    locatorForm: "https://brooklynautoonline.com/locatorservice",
    loanCalculator: "https://brooklynautoonline.com/loancalculator",
    mapEmbed:
      "https://www.google.com/maps?q=161+Marion+St,+Staten+Island,+NY+10310&hl=en&z=15&output=embed",
  },
};

export type Vehicle = {
  id: string;
  slug: string;
  year: string;
  make: string;
  model: string;
  title: string;
  trim: string;
  mileage: string;
  drive: string;
  stock?: string;
  vin?: string;
  engine?: string;
  transmission?: string;
  exteriorColor?: string;
  interiorColor?: string;
  bodyStyle?: string;
  fuel?: string;
  description?: string;
  images: string[];
  url: string;
  legacyUrl?: string;
  image: string;
  price: string;
  alt: string;
};

export type Category = "all" | "luxury" | "sports" | "suv" | "trucks";

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Vehicles" },
  { id: "luxury", label: "Luxury" },
  { id: "sports", label: "Sports Cars" },
  { id: "suv", label: "SUVs" },
  { id: "trucks", label: "Trucks" },
];

export type SortOption = "price-asc" | "price-desc" | "year-desc" | "year-asc" | "mileage-asc";

export const sortOptions: { id: SortOption; label: string }[] = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "year-desc", label: "Year: Newest First" },
  { id: "year-asc", label: "Year: Oldest First" },
  { id: "mileage-asc", label: "Mileage: Low to High" },
];

const luxuryBrands = [
  "Lamborghini", "Ferrari", "Bentley", "Rolls-Royce", "Aston Martin", "McLaren",
  "Porsche", "Mercedes-Benz", "BMW", "Audi", "Lexus", "Cadillac", "Alpina",
];

const sportsKeywords = ["Corvette", "911", "Huracan", "Revuelto", "R8", "RS6", "RS7", "M2", "M5", "Trackhawk", "GT"];
const suvKeywords = ["X7", "X3", "XB7", "DBX", "Urus", "G-Class", "RX", "Grand Cherokee", "Wrangler"];
const truckKeywords = ["RAM", "F-150", "F-450", "Silverado", "1500"];

export function categorizeVehicle(vehicle: Vehicle): Category[] {
  const text = `${vehicle.title} ${vehicle.trim}`.toLowerCase();
  const cats: Category[] = ["all"];
  if (luxuryBrands.some((b) => text.includes(b.toLowerCase()))) cats.push("luxury");
  if (sportsKeywords.some((k) => text.toLowerCase().includes(k.toLowerCase()))) cats.push("sports");
  if (suvKeywords.some((k) => text.toLowerCase().includes(k.toLowerCase()))) cats.push("suv");
  if (truckKeywords.some((k) => text.toLowerCase().includes(k.toLowerCase()))) cats.push("trucks");
  return cats;
}

export function parsePrice(price: string): number {
  if (price.toLowerCase().includes("call")) return Infinity;
  return parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
}

export function parseYear(title: string, year?: string): number {
  if (year) return parseInt(year, 10) || 0;
  const match = title.match(/\b(19|20)\d{2}\b/);
  return match ? parseInt(match[0], 10) : 0;
}

export function parseMileage(mileage: string): number {
  return parseInt(mileage.replace(/[^0-9]/g, ""), 10) || 0;
}

export function sortVehicles(vehicles: Vehicle[], sort: SortOption): Vehicle[] {
  const sorted = [...vehicles];
  sorted.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return parsePrice(a.price) - parsePrice(b.price);
      case "price-desc":
        return parsePrice(b.price) - parsePrice(a.price);
      case "year-desc":
        return parseYear(b.title) - parseYear(a.title);
      case "year-asc":
        return parseYear(a.title) - parseYear(b.title);
      case "mileage-asc":
        return parseMileage(a.mileage) - parseMileage(b.mileage);
      default:
        return 0;
    }
  });
  return sorted;
}

function normalizeVehicleText(text: string): string {
  return text
    .replace(/MercedesBenz/g, "Mercedes-Benz")
    .replace(/RollsRoyce/g, "Rolls-Royce")
    .replace(/LandRover/g, "Land Rover")
    .replace(/AstonMartin/g, "Aston Martin")
    .replace(/AlfaRomeo/g, "Alfa Romeo");
}

const multiWordMakes = [
  "Mercedes-Benz",
  "Mercedes-AMG",
  "Land Rover",
  "Aston Martin",
  "Alfa Romeo",
  "Lamborghini",
  "Rolls-Royce",
  "McLaren",
  "Bentley",
  "Ferrari",
  "Porsche",
  "Cadillac",
  "Chevrolet",
  "Lexus",
  "Toyota",
  "Nissan",
  "Dodge",
  "Jeep",
  "Ford",
  "RAM",
  "Mazda",
  "Audi",
  "BMW",
];

export function getVehicleMake(vehicle: Vehicle | string): string {
  if (typeof vehicle !== "string" && vehicle.make) return vehicle.make;
  const title = typeof vehicle === "string" ? vehicle : vehicle.title;
  const text = normalizeVehicleText(title.replace(/^\d{4}\s*/, ""));
  const sorted = [...multiWordMakes].sort((a, b) => b.length - a.length);
  const found = sorted.find((make) => text.startsWith(make));
  return found || text.split(" ")[0] || "Other";
}

export function getVehicleModel(vehicle: Vehicle | string): string {
  if (typeof vehicle !== "string" && vehicle.model) return vehicle.model;
  const title = typeof vehicle === "string" ? vehicle : vehicle.title;
  const make = getVehicleMake(title);
  const text = normalizeVehicleText(title.replace(/^\d{4}\s*/, ""));
  return text.slice(make.length).trim();
}

export function getMakeModelCatalog(vehicles: Vehicle[]): {
  makes: string[];
  countByMake: Record<string, number>;
  modelsByMake: Record<string, string[]>;
} {
  const modelsByMake: Record<string, Set<string>> = {};
  const countByMake: Record<string, number> = {};

  vehicles.forEach((vehicle) => {
    const make = getVehicleMake(vehicle);
    const model = getVehicleModel(vehicle);
    countByMake[make] = (countByMake[make] ?? 0) + 1;
    if (!modelsByMake[make]) modelsByMake[make] = new Set();
    if (model) modelsByMake[make].add(model);
  });

  const makes = Object.keys(modelsByMake).sort();
  return {
    makes,
    countByMake,
    modelsByMake: Object.fromEntries(
      makes.map((make) => [make, Array.from(modelsByMake[make]).sort()])
    ),
  };
}

export function getUniqueMakes(vehicles: Vehicle[]): string[] {
  return getMakeModelCatalog(vehicles).makes;
}

export function getVehicleSearchText(vehicle: Vehicle): string {
  return [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.title,
    vehicle.trim,
    vehicle.price,
    vehicle.mileage,
    vehicle.stock,
    vehicle.vin,
    vehicle.drive,
    vehicle.engine,
    vehicle.transmission,
    vehicle.exteriorColor,
    vehicle.interiorColor,
    vehicle.bodyStyle,
    vehicle.fuel,
    vehicle.description,
    getVehicleMake(vehicle),
    getVehicleModel(vehicle),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}
