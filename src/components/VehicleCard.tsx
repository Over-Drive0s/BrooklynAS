import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/data/site";

type VehicleCardProps = {
  vehicle: Vehicle;
  priority?: boolean;
};

export default function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  return (
    <Link href={vehicle.url} className="vehicle-card group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={vehicle.image}
          alt={vehicle.alt || vehicle.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-brand-black">{vehicle.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {vehicle.trim}
          {vehicle.mileage && ` • ${vehicle.mileage}`}
          {vehicle.drive && ` • ${vehicle.drive}`}
        </p>
        <p className="mt-auto pt-3 text-lg font-bold text-brand-red">{vehicle.price}</p>
      </div>
    </Link>
  );
}
