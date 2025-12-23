"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X } from "lucide-react";
import { createCarListing } from "@/actions/car/car";
import Image from "next/image";

const carFeatures = [
  { id: "bluetooth", label: "Bluetooth" },
  { id: "backup-camera", label: "Backup Camera" },
  { id: "navigation", label: "Navigation System" },
  { id: "leather-seats", label: "Leather Seats" },
  { id: "sunroof", label: "Sunroof" },
  { id: "heated-seats", label: "Heated Seats" },
  { id: "cruise-control", label: "Cruise Control" },
  { id: "parking-sensors", label: "Parking Sensors" },
];

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title is too long"),
  make: z.string().min(1, "Please select a make"),
  model: z.string().min(1, "Please enter the model"),
  year: z.string().min(4, "Please enter a valid year"),
  vin: z
    .string()
    .min(17, "VIN must be 17 characters")
    .max(17, "VIN must be 17 characters")
    .optional()
    .or(z.literal("")),
  mileage: z.string().min(1, "Please enter the mileage"),
  condition: z.string().min(1, "Please select condition"),
  bodyType: z.string().min(1, "Please select body type"),
  transmission: z.string().min(1, "Please select transmission"),
  fuelType: z.string().min(1, "Please select fuel type"),
  exteriorColor: z.string().min(1, "Please enter exterior color"),
  interiorColor: z.string().min(1, "Please enter interior color"),
  doors: z.string().min(1, "Please select number of doors"),
  seats: z.string().min(1, "Please enter number of seats"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description is too long"),
  features: z.array(z.string()).optional(),
  price: z.string().min(1, "Please enter a price"),
  negotiable: z.string(),
  location: z.string().min(1, "Please enter your location"),
  ownerName: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  images: z.array(z.string()).min(1, "Please upload at least one image"),
});

export function SellCarForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      make: "",
      model: "",
      year: "",
      vin: "",
      mileage: "",
      condition: "",
      bodyType: "",
      transmission: "",
      fuelType: "",
      exteriorColor: "",
      interiorColor: "",
      doors: "",
      seats: "",
      description: "",
      features: [],
      price: "",
      negotiable: "no",
      location: "",
      ownerName: "",
      phone: "",
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newImages.push(result);
          if (newImages.length === files.length) {
            const updatedImages = [...uploadedImages, ...newImages];
            setUploadedImages(updatedImages);
            form.setValue("images", updatedImages);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const result = await createCarListing({
      ...values,
      year: parseInt(values.year),
      mileage: parseInt(values.mileage),
      doors: parseInt(values.doors),
      seats: parseInt(values.seats),
      price: parseFloat(values.price),
      negotiable: values.negotiable === "yes",
    });

    if (result) {
      // Success - redirect or show message
      console.log("Car listing created:", result);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 2020 Tesla Model 3 Long Range"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Create a compelling title for your listing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tesla">Tesla</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="porsche">Porsche</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Model 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIN (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="17-character VIN"
                        maxLength={17}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Details */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50000" {...field} />
                    </FormControl>
                    <FormDescription>In miles</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bodyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select body type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                        <SelectItem value="wagon">Wagon</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transmission</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="cvt">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gasoline">Gasoline</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="plug-in-hybrid">
                          Plug-in Hybrid
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exteriorColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exterior Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Pearl White" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="interiorColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interior Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doors</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">2 Doors</SelectItem>
                        <SelectItem value="3">3 Doors</SelectItem>
                        <SelectItem value="4">4 Doors</SelectItem>
                        <SelectItem value="5">5 Doors</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seats</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Description & Features */}
        <Card>
          <CardHeader>
            <CardTitle>Description & Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your car's condition, history, and any special features..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information to attract buyers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Features</FormLabel>
                    <FormDescription>
                      Select all features that apply
                    </FormDescription>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {carFeatures.map((feature) => (
                      <FormField
                        key={feature.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={feature.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          feature.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== feature.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {feature.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="35000" {...field} />
                  </FormControl>
                  <FormDescription>Set your asking price</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="negotiable"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is the price negotiable?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-8 transition-colors hover:border-accent">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer text-center"
                        >
                          <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                          <p className="mb-2 text-sm font-medium">
                            Click to upload images
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Upload up to 10 images (JPG, PNG)
                          </p>
                          <input
                            id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>

                      {uploadedImages.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-3">
                          {uploadedImages.map((image, index) => (
                            <div
                              key={index}
                              className="relative aspect-video overflow-hidden rounded-lg"
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Car ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add clear photos from multiple angles
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco, CA" {...field} />
                  </FormControl>
                  <FormDescription>
                    City and state where the car is located
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? "Publishing..." : "Publish Listing"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
