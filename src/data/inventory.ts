import inventoryData from "../../data/inventory.json";
import { parsePrice, type Vehicle } from "./site";

export const inventory: Vehicle[] = inventoryData as Vehicle[];

export function getVehicleById(id: string): Vehicle | undefined {
  return inventory.find((v) => v.id === id);
}

export const featuredInventory: Vehicle[] = [...inventory]
  .sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
  .slice(0, 8);
