import { notFound } from "next/navigation";
import VehicleDetail from "@/components/VehicleDetail";
import ContactCTA from "@/components/ContactCTA";
import { getVehicleById, inventory } from "@/data/inventory";
import { categorizeVehicle } from "@/data/site";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return inventory.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) return { title: "Vehicle Not Found" };
  return {
    title: `${vehicle.title} ${vehicle.trim} | Brooklyn Auto Sales`,
    description: `${vehicle.title} ${vehicle.trim} - ${vehicle.price} at Brooklyn Auto Sales, Staten Island NY.`,
  };
}

export default async function VehiclePage({ params }: Props) {
  const { id } = await params;
  const vehicle = getVehicleById(id);
  if (!vehicle) notFound();

  const cats = categorizeVehicle(vehicle);
  const related = inventory
    .filter((v) => v.id !== id && categorizeVehicle(v).some((c) => cats.includes(c) && c !== "all"))
    .slice(0, 4);

  return (
    <>
      <VehicleDetail vehicle={vehicle} related={related} />
      <ContactCTA />
    </>
  );
}
