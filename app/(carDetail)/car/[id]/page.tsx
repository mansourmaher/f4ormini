import React from "react";
import { CarDetailView } from "../../_components/card_detail_view";
import { Header } from "@/app/_landing_component/header";
import { Footer } from "@/app/_landing_component/footer";
import { getCarById } from "@/actions/car/car";

const page = async ({ params }: { params: { id: string } }) => {
  const carId = params.id;
  const carDetails = await getCarById(carId);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-8xl">
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">
              Detailed information about the selected vehicle
            </p>
          </div>
          <CarDetailView carDetail={carDetails} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
