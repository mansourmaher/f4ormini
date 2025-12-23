"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Gauge, Fuel, Calendar, Grid2x2, List, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/_landing_component/header";
import { Footer } from "@/app/_landing_component/footer";
import { getAllCars } from "@/actions/car/car";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/actions/auth/account";
import { initModel, predictPrice } from "@/lib/prediction";

interface AllCarsProps {
  cars: Awaited<ReturnType<typeof getAllCars>>;
  user: Awaited<ReturnType<typeof getUserProfile>>;
}

export default function AllCars({ cars, user }: AllCarsProps) {
  const allCars = cars.data;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(200000);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [predictedBudget, setPredictedBudget] = useState<number | null>(null);

  const router = useRouter();

  const filteredCarsBeforeModal = allCars?.filter(
    (car) => car.price >= minBudget && car.price <= maxBudget
  );
  const [filteredCars, setFilteredCars] = useState(filteredCarsBeforeModal);

  const handleBudgetReset = () => {
    setMinBudget(0);
    setMaxBudget(200000);
    setPredictedBudget(null);
    setFilteredCars(allCars?.filter((car) => car.price >= 0 && car.price <= 200000));
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        await initModel();
        setModelReady(true);
      } catch (e) {
        console.error("Failed to load model", e);
      }
    };
    loadModel();
  }, []);

  useEffect(() => {
    const filtered = allCars?.filter(
      (car) => car.price >= minBudget && car.price <= maxBudget
    );
    setFilteredCars(filtered);
  }, [minBudget, maxBudget]);

  const loadCarsBasedOnModalPredction = async () => {
    try {
      if (!modelReady) {
        return;
      }

      setIsLoading(true);

      const testResult = await predictPrice({
        gender: user.data?.gender === "male" ? 1 : 0,
        age: user.data?.age || 30,
        salary: user.data?.annualSalary || 50000,
        debt: user.data?.totalDebt || 0,
        netWorth: user.data?.netWorth || 50000,
      });
      
      setPredictedBudget(testResult);
      setMaxBudget(testResult);
      setMinBudget(0);
      
      const filteredCars = allCars?.filter((car) => car.price <= testResult);
      setFilteredCars(filteredCars);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("error while loading modal", e);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <section className="border-b border-border bg-background py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h1 className="text-balance text-4xl font-bold md:text-5xl">
                Browse All Cars
              </h1>
              <p className="mt-2 text-muted-foreground">
                Explore {allCars.length} premium vehicles from verified sellers
              </p>
            </div>

            {/* Filter Controls */}
            <div className="space-y-4">
              {/* Budget Filter - Premium Slider */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      💰
                    </span>
                    Budget Range Filter
                  </h2>
                  {(minBudget !== 0 || maxBudget !== 200000 || predictedBudget !== null) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBudgetReset}
                      className="text-xs"
                    >
                      Reset All
                    </Button>
                  )}
                </div>

                {/* AI Budget Prediction Section */}
                {modelReady && (
                  <div className="mb-6 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 p-4 border border-accent/20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-accent" />
                          AI Budget Recommendation
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Get personalized budget based on your profile
                        </p>
                        {predictedBudget !== null && (
                          <div className="mt-2">
                            <p className="text-lg font-bold text-accent">
                              Recommended: ${predictedBudget.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Based on your financial profile
                            </p>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={loadCarsBasedOnModalPredction}
                        disabled={isLoading}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Calculate My Budget
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Manual Budget Inputs */}
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  {/* Min Budget Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Minimum Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        value={minBudget}
                        onChange={(e) =>
                          setMinBudget(
                            Math.min(Number(e.target.value), maxBudget)
                          )
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 pl-8 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Max Budget Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Maximum Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        value={maxBudget}
                        onChange={(e) =>
                          setMaxBudget(
                            Math.max(Number(e.target.value), minBudget)
                          )
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 pl-8 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="200000"
                      />
                    </div>
                  </div>
                </div>

                {/* Range Sliders */}
                <div className="space-y-6">
                  {/* Min Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">
                        Minimum Range
                      </label>
                      <span className="text-xs font-semibold text-foreground">
                        ${minBudget.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={minBudget}
                      onChange={(e) =>
                        setMinBudget(
                          Math.min(Number(e.target.value), maxBudget)
                        )
                      }
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${(minBudget / 200000) * 100}%, hsl(var(--muted)) ${(minBudget / 200000) * 100}%, hsl(var(--muted)) 100%)`
                      }}
                    />
                  </div>

                  {/* Max Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">
                        Maximum Range
                      </label>
                      <span className="text-xs font-semibold text-foreground">
                        ${maxBudget.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={maxBudget}
                      onChange={(e) =>
                        setMaxBudget(
                          Math.max(Number(e.target.value), minBudget)
                        )
                      }
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${(maxBudget / 200000) * 100}%, hsl(var(--muted)) ${(maxBudget / 200000) * 100}%, hsl(var(--muted)) 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Selected Range Display */}
                <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Selected Price Range
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    ${minBudget.toLocaleString()} - ${maxBudget.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* View Toggle and Results Summary */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filteredCars?.length || 0}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {allCars?.length || 0}
                  </span>{" "}
                  vehicles
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="gap-2"
                  >
                    <Grid2x2 className="h-4 w-4" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="gap-2"
                  >
                    <List className="h-4 w-4" />
                    List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cars Grid/List */}
        <section className="container mx-auto px-4 py-12">
          {filteredCars?.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                  : "space-y-4"
              }
            >
              {filteredCars.map((car) => (
                <Link key={car.id} href={`/cars/${car.id}`}>
                  <Card
                    className={`group overflow-hidden bg-card transition-all hover:shadow-lg cursor-pointer h-full ${
                      viewMode === "list" ? "flex gap-4 p-4" : ""
                    }`}
                  >
                    {/* Image Container */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list"
                          ? "h-32 w-40 flex-shrink-0"
                          : "h-[280px] w-full"
                      }`}
                    >
                      <Image
                        src={car.images[0] || "/placeholder.svg"}
                        alt={car.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                      />

                      {car.bodyType && !viewMode.includes("list") && (
                        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                          {car.bodyType}
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className={`absolute ${
                          viewMode === "list"
                            ? "right-2 top-2"
                            : "right-3 top-3"
                        } h-8 w-8 rounded-full`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Content Container */}
                    <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                      <div className={viewMode === "list" ? "mb-2" : "mb-3"}>
                        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                          {car.title}
                        </h3>
                        <p
                          className={`${
                            viewMode === "list" ? "text-xl" : "text-2xl"
                          } font-bold text-accent`}
                        >
                          ${car.price.toLocaleString()}
                        </p>
                      </div>

                      {car.bodyType && viewMode === "list" && (
                        <Badge className="mb-2 bg-accent text-accent-foreground text-xs">
                          {car.bodyType}
                        </Badge>
                      )}

                      <div
                        className={`grid gap-2 border-t border-border pt-3 text-xs ${
                          viewMode === "list" ? "grid-cols-3" : "grid-cols-3"
                        }`}
                      >
                        <div
                          className={`flex ${
                            viewMode === "list"
                              ? "flex-col gap-1"
                              : "flex-col items-center gap-1"
                          }`}
                        >
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {car.year}
                          </span>
                        </div>
                        <div
                          className={`flex ${
                            viewMode === "list"
                              ? "flex-col gap-1"
                              : "flex-col items-center gap-1"
                          }`}
                        >
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {car.mileage}
                          </span>
                        </div>
                        <div
                          className={`flex ${
                            viewMode === "list"
                              ? "flex-col gap-1"
                              : "flex-col items-center gap-1"
                          }`}
                        >
                          <Fuel className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {car.fuelType}
                          </span>
                        </div>
                      </div>

                      {!viewMode.includes("list") && (
                        <Button
                          className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/car/${car.id}`);
                          }}
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
              <div className="text-center">
                <p className="mb-2 text-lg font-semibold text-foreground">
                  No cars found
                </p>
                <p className="mb-4 text-muted-foreground">
                  Try adjusting your budget range to find more vehicles
                </p>
                <Button onClick={handleBudgetReset}>Reset Filters</Button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}