"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Share2,
  Calendar,
  Gauge,
  Fuel,
  Palette,
  Settings,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Car,
} from "lucide-react";
import Image from "next/image";
import { getCarById } from "@/actions/car/car";

interface CarDetailViewProps {
  carDetail: Awaited<ReturnType<typeof getCarById>>;
}
export function CarDetailView({ carDetail }: CarDetailViewProps) {
  const car = carDetail.data;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  if (!car) return;

  // Mock data - this would come from your database based on the car ID

  const specs = [
    { icon: Calendar, label: "Year", value: car?.year },
    {
      icon: Gauge,
      label: "Mileage",
      value: `${car?.mileage.toLocaleString()} mi`,
    },
    { icon: Fuel, label: "Fuel Type", value: car?.fuelType },
    { icon: Settings, label: "Transmission", value: car?.transmission },
    { icon: Car, label: "Body Type", value: car?.bodyType },
    { icon: Palette, label: "Exterior", value: car?.exteriorColor },
    { icon: Palette, label: "Interior", value: car?.interiorColor },
    { icon: CheckCircle2, label: "Condition", value: car?.condition },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Images and Description */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <Card className="mb-6 overflow-hidden">
            <div className="relative aspect-video bg-muted">
              <Image
                src={car.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
              {car.bodyType && (
                <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                  {car.bodyType}
                </Badge>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-4 top-4 rounded-full"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>

              {car.images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {car.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "w-6 bg-accent"
                        : "bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto p-4">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-accent"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </Card>

          {/* Title and Price */}
          <div className="mb-6">
            <div className="mb-2 flex items-start justify-between">
              <h1 className="text-3xl font-bold">
                {car.year} {car.make} {car.model}
              </h1>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-4xl font-bold text-accent">
                ${car.price.toLocaleString()}
              </p>
              {car.negotiable && (
                <Badge variant="outline" className="text-sm">
                  Negotiable
                </Badge>
              )}
            </div>
          </div>

          {/* Specifications Grid */}
          <Card className="mb-6 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Vehicle Specifications
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2">
                    <spec.icon className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {spec.label}
                    </p>
                    <p className="font-semibold capitalize">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>VIN: {car.vin}</span>
            </div>
          </Card>

          {/* Description */}
          <Card className="mb-6 p-6">
            <h2 className="mb-4 text-xl font-semibold">Description</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {car.description}
            </p>
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Features & Amenities</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Seller Info and Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            {/* Contact Seller Card */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact Seller</h2>
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <span className="text-lg font-semibold text-accent">
                      {car.user?.firstName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {car.user?.lastName} {car.user?.firstName}{" "}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{car.user?.address}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <a
                    href={`tel:${car.user?.phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{car.user?.phone}</span>
                  </a>
                  <a
                    href={`mailto:${car.user?.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{car.user?.email}</span>
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Seller
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </Card>

            {/* Safety Tips Card */}
            <Card className="border-amber-500/20 bg-amber-500/5 p-6">
              <h3 className="mb-2 font-semibold text-amber-600 dark:text-amber-500">
                Safety Tips
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Meet in a safe, public location</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Check the vehicle and its documents</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Never pay in advance before seeing the car</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Get a vehicle history report</span>
                </li>
              </ul>
            </Card>

            {/* Report Card */}
            <Button
              variant="ghost"
              className="w-full text-sm text-muted-foreground"
            >
              Report this listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
