"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db"; // Adjust path to your db instance

interface CreateCarListingData {
  title: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  mileage: number;
  condition: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  doors: number;
  seats: number;
  description: string;
  features?: string[];
  price: number;
  negotiable: boolean;
  images: string[];
  location: string;
  ownerName: string;
  phone: string;
}

export async function createCarListing(data: CreateCarListingData) {
  try {
    const user=await auth()
    

    // Optional: Add role check if needed
    // if (user.user.role !== "SELLER") {
    //   return null;
    // }

    const carListing = await db.car.create({
      data: {
        userId:user?.user.id,
        title: data.title,
        make: data.make,
        model: data.model,
        year: data.year,
        vin: data.vin || null,
        mileage: data.mileage,
        condition: data.condition,
        bodyType: data.bodyType,
        transmission: data.transmission,
        fuelType: data.fuelType,
        exteriorColor: data.exteriorColor,
        interiorColor: data.interiorColor,
        doors: data.doors,
        seats: data.seats,
        description: data.description,
        features: data.features || [],
        price: data.price,
        negotiable: data.negotiable,
        images: data.images,
        location: data.location,
        ownerName: data.ownerName,
        phone: data.phone,
        status: "published", // or "published" depending on your flow
      },
    });

    return carListing;
  } catch (error) {
    console.error("Error creating car listing:", error);
    return null;
  }
}

export async function getAllCars(filters?:any) {
  try {
    

  

    const cars = await db.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: cars };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { success: false, error: "Failed to fetch cars" };
  }
}

export async function getCarById(id: string) {
  try {
    const car = await db.car.findUnique({
      where: { id },
      include:{
        user:true
        
      }
    });
    console.log('car ',car)

    if (!car) {
      return { success: false, error: "Car not found" };
    }

    return { success: true, data: car };
  } catch (error) {
    console.error("Error fetching car:", error);
    return { success: false, error: "Failed to fetch car" };
  }
}