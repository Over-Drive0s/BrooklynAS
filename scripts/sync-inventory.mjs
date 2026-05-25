import { writeFileSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "data", "inventory.json");
const siteBase = "https://brooklynautoonline.com";

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
].sort((a, b) => b.length - a.length);

function normalizeMakeText(text) {
  return text
    .replace(/MercedesBenz/g, "Mercedes-Benz")
    .replace(/RollsRoyce/g, "Rolls-Royce")
    .replace(/LandRover/g, "Land Rover")
    .replace(/AstonMartin/g, "Aston Martin")
    .replace(/AlfaRomeo/g, "Alfa Romeo");
}

function getMakeFromText(text) {
  const normalized = normalizeMakeText(text.replace(/^\d{4}\s*/, ""));
  const found = multiWordMakes.find((make) => normalized.startsWith(make));
  return found || normalized.split(" ")[0] || "Other";
}

function getModelFromText(text, make) {
  const normalized = normalizeMakeText(text.replace(/^\d{4}\s*/, ""));
  return normalized.slice(make.length).trim();
}

function parseVehicle(ogTitle) {
  const normalized = normalizeMakeText(ogTitle.trim());
  const yearMatch = normalized.match(/^(\d{4})\s+(.+)$/);
  if (!yearMatch) {
    return { year: "", make: "", model: "", title: normalized, trim: "" };
  }

  const year = yearMatch[1];
  const remainder = yearMatch[2];
  const make = getMakeFromText(`${year} ${remainder}`);
  const afterMake = remainder.slice(make.length).trim();
  const model = afterMake.split(" ")[0] || afterMake;
  const trim = afterMake.slice(model.length).trim();

  return {
    year,
    make,
    model,
    title: `${year} ${make} ${model}`.trim(),
    trim,
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "BrooklynAS-Sync/1.0" },
  });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

function extractMeta(html, property) {
  const match = html.match(new RegExp(`property="${property}" content="([^"]+)"`, "i"));
  return match?.[1] ?? "";
}

function extractPrice(html) {
  const match = html.match(/class="[^"]*vehicle-price[^"]*"[^>]*>[\s\S]*?(\$[0-9,]+)/i);
  if (match) return match[1];
  const fallback = html.match(/\$[0-9,]+/);
  return fallback?.[0] ?? "Call for Price";
}

function extractImages(html, id) {
  const pattern = new RegExp(
    `(https://imagescdn\\.dealercarsearch\\.com/Media/1483/${id}/[^"'\\s>]+\\.(?:jpg|jpeg|png|JPG))`,
    "gi"
  );
  const matches = html.match(pattern) || [];
  return [...new Set(matches)];
}

function extractOpt(html, className) {
  const match = html.match(
    new RegExp(`class="${className}"[^>]*>\\s*<label>[^<]*:</label>\\s*<span>([^<]*)</span>`, "i")
  );
  return match?.[1]?.trim() ?? "";
}

function extractMileage(html) {
  const fromLine = html.match(/class="mileage"[^>]*>[^<]*Miles:\s*([^<•]+)/i);
  if (fromLine) {
    const value = fromLine[1].trim();
    return value.toLowerCase().includes("mile") ? value : `${value} miles`;
  }

  const fromOpt = extractOpt(html, "i19r_optMPG");
  if (fromOpt) return `${fromOpt} miles`;
  return "";
}

function extractDrive(html) {
  const fromLine = html.match(/class="drive-train"[^>]*>[^<]*Drive:\s*([^<•]+)/i);
  if (fromLine) return fromLine[1].trim();

  const fromOpt = extractOpt(html, "i19r_optDrive");
  return fromOpt;
}

function extractDescription(html) {
  const section =
    html.match(/id="description"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ||
    html.match(/class="container vehicle-description"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i)?.[1] ||
    "";

  let text = section
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  text = text
    .replace(/^Vehicle Description\s*/i, "")
    .split(
      /Vehicle disclaimer|View Photos|Thumbnails|Large Photos|Make An Offer|ASKING PRICE|ACKNOWLEDGMENT AND CONSENT/i
    )[0]
    .trim();

  const visitIndex = text.search(/PLEASE BE SURE TO VISIT OUR LOCATION/i);
  if (visitIndex >= 0) {
    text = text.slice(0, visitIndex).trim();
  }

  if (!text || /^please be sure to visit/i.test(text)) {
    return "";
  }

  return text.slice(0, 2000);
}

function parseVehiclePage(html, id, slug, legacyUrl) {
  const ogTitle = extractMeta(html, "og:title");
  const parsed = parseVehicle(ogTitle || slug.replace(/-/g, " "));
  const images = extractImages(html, id);
  const image = images[0] || extractMeta(html, "og:image");
  const mileage = extractMileage(html);
  const drive = extractDrive(html);

  return {
    id,
    slug,
    year: parsed.year,
    make: parsed.make,
    model: parsed.model,
    title: parsed.title,
    trim: parsed.trim,
    mileage,
    drive,
    stock: extractOpt(html, "i19r_optStock"),
    vin: extractOpt(html, "i19r_optVin"),
    engine: extractOpt(html, "i19r_optEngine"),
    transmission: extractOpt(html, "i19r_optTrans"),
    exteriorColor: extractOpt(html, "i19r_optColor"),
    interiorColor: extractOpt(html, "i19r_optInteriorColor"),
    bodyStyle: extractOpt(html, "i19r_optBody"),
    fuel: extractOpt(html, "i19r_optFuel"),
    description: extractDescription(html) || extractMeta(html, "og:description"),
    images,
    url: `/inventory/${id}`,
    legacyUrl,
    image,
    price: extractPrice(html),
    alt: ogTitle || parsed.title,
  };
}

async function syncInventory() {
  const sitemap = await fetchText(`${siteBase}/sitemap.xml`);
  const entries = [
    ...sitemap.matchAll(/<loc>(https:\/\/brooklynautoonline\.com\/vdp\/(\d+)\/([^<]+))<\/loc>/g),
  ].map((match) => ({
    url: match[1],
    id: match[2],
    slug: match[3],
  }));

  const existing = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : [];
  const existingById = new Map(existing.map((item) => [item.id, item]));

  console.log(`Syncing ${entries.length} vehicles with photos and details...`);

  const inventory = [];
  for (const entry of entries) {
    const legacyUrl = `${siteBase}/vdp/${entry.id}/${entry.slug}`;

    try {
      const html = await fetchText(legacyUrl);
      inventory.push(parseVehiclePage(html, entry.id, entry.slug, legacyUrl));
      process.stdout.write(".");
    } catch (error) {
      console.warn(`\nSkipping ${entry.id}: ${error.message}`);
      const cached = existingById.get(entry.id);
      if (cached) {
        inventory.push({
          ...cached,
          images: cached.images?.length ? cached.images : cached.image ? [cached.image] : [],
          url: `/inventory/${entry.id}`,
          legacyUrl,
        });
      }
    }
  }

  inventory.sort((a, b) => a.title.localeCompare(b.title));
  writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);

  const withPhotos = inventory.filter((v) => v.images?.length > 1).length;
  const withMiles = inventory.filter((v) => v.mileage).length;
  console.log(`\nSaved ${inventory.length} vehicles (${withPhotos} with galleries, ${withMiles} with mileage)`);
}

syncInventory().catch((error) => {
  console.error(error);
  process.exit(1);
});
