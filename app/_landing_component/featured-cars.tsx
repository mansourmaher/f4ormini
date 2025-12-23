"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Gauge, Fuel, Calendar } from "lucide-react";
import Image from "next/image";

import image from "../../public/image.png";
import { getAllCars } from "@/actions/car/car";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { initModel, predictPrice } from "@/lib/prediction";
import toast from "react-hot-toast";

interface FeaturedCarsProps {
  cars: Awaited<ReturnType<typeof getAllCars>>;
}
export function FeaturedCars({ cars }: FeaturedCarsProps) {
  const router = useRouter();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
            Featured Vehicles
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Hand-picked premium cars from verified sellers
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars?.data?.map((car) => (
            <Card
              key={car.id}
              className="group overflow-hidden bg-card transition-all hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.images?.[0] || "/placeholder.svg"}
                  alt={car.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                  {car.condition}
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-3 h-8 w-8 rounded-full"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="mb-1 text-lg font-semibold text-foreground">
                    {car.title}
                  </h3>
                  <p className="text-2xl font-bold text-accent">
                    TN{car.price}
                  </p>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{car.year}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{car.mileage}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {car.fuelType}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => {
                    router.push(`car/${car.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" variant="outline">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
}
