"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Upload,
  User,
  DollarSign,
  Briefcase,
  MapPin,
  Bell,
  Loader2,
} from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/actions/auth/account";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  age: z.string().min(1, "Please enter your age"),
  address: z.string().min(5, "Please enter your address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(1, "Please select your state"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  employmentStatus: z.string().min(1, "Please select your employment status"),
  occupation: z.string().optional().or(z.literal("")),
  employer: z.string().optional().or(z.literal("")),
  annualSalary: z.string().min(1, "Please enter your annual salary"),
  netWorth: z.string().min(1, "Please enter your net worth"),
  totalDebt: z.string().min(1, "Please enter your total debt"),
  creditScore: z.string().min(1, "Please select your credit score range"),
  buyerSeller: z.string().min(1, "Please select your primary interest"),
  budgetRange: z.string().optional(),
  preferredBrands: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  profileImage: z.string().optional(),
  gender: z.string().optional(),
});

export function AccountSetupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [profileImage, setProfileImage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      age: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      employmentStatus: "",
      occupation: "",
      employer: "",
      annualSalary: "",
      netWorth: "",
      totalDebt: "",
      creditScore: "",
      buyerSeller: "",
      budgetRange: "",
      preferredBrands: "",
      emailNotifications: true,
      smsNotifications: false,
      bio: "",
      profileImage: "",
      gender: "",
    },
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsFetching(true);
      const result = await getUserProfile();

      if (result.success && result.data) {
        const user = result.data;

        // Format date for input field
        const formattedDate = user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "";

        form.reset({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          dateOfBirth: formattedDate,
          age: user.age?.toString() || "",
          address: user.address || "",
          city: user.city || "",
          state: user.state || "",
          zipCode: user.zipCode || "",
          employmentStatus: user.employmentStatus || "",
          occupation: user.occupation || "",
          employer: user.employer || "",
          annualSalary: user.annualSalary?.toString() || "",
          netWorth: user.netWorth?.toString() || "",
          totalDebt: user.totalDebt?.toString() || "",
          creditScore: user.creditScore || "",
          buyerSeller: user.buyerSeller || "",
          budgetRange: user.budgetRange || "",
          preferredBrands: user.preferredBrands || "",
          emailNotifications: user.emailNotifications ?? true,
          smsNotifications: user.smsNotifications ?? false,
          bio: user.bio || "",
          profileImage: user.profileImage || "",
          gender: user.gender,
        });

        if (user.profileImage) {
          setProfileImage(user.profileImage);
        }
      } else {
        toast.error(result.error || "Failed to load profile");
      }

      setIsFetching(false);
    };

    fetchUserProfile();
  }, [form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        form.setValue("profileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const result = await updateUserProfile(values);

    if (result.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(result.error || "Failed to update profile");
    }

    setIsLoading(false);
  };

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Picture
            </CardTitle>
            <CardDescription>
              Upload a profile photo to personalize your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl">
                  {form.watch("firstName")?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <label htmlFor="profile-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                    asChild
                  >
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="mt-2 text-sm text-muted-foreground">
                  JPG, PNG or GIF (max. 5MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Email cannot be changed</FormDescription>
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
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormDescription>
                      Required for financing eligibility
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about yourself and your car preferences..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will appear on your public profile
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Los Angeles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="90001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Information
            </CardTitle>
            <CardDescription>
              This information helps us provide accurate financing options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employed">
                        Employed Full-Time
                      </SelectItem>
                      <SelectItem value="part-time">
                        Employed Part-Time
                      </SelectItem>
                      <SelectItem value="self-employed">
                        Self-Employed
                      </SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="annualSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="75000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your gross annual income (USD)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netWorth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Worth</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="150000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Total assets minus liabilities (USD)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="totalDebt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Debt</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Total outstanding debt (USD)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="creditScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Score Range</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="excellent">
                          Excellent (750+)
                        </SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="poor">Poor (600-649)</SelectItem>
                        <SelectItem value="very-poor">
                          Very Poor (Below 600)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="buyerSeller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Interest</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Are you looking to buy or sell?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="buyer">Looking to Buy</SelectItem>
                      <SelectItem value="seller">Looking to Sell</SelectItem>
                      <SelectItem value="both">
                        Both Buying and Selling
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-20k">Under $20,000</SelectItem>
                      <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                      <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                      <SelectItem value="60k-80k">$60,000 - $80,000</SelectItem>
                      <SelectItem value="80k-100k">
                        $80,000 - $100,000
                      </SelectItem>
                      <SelectItem value="over-100k">Over $100,000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Helps us show you relevant listings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredBrands"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Brands (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Tesla, BMW, Mercedes-Benz"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of your favorite brands
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive updates about new listings and messages via email
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      SMS Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive important alerts via text message
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <Card>
          <CardFooter className="flex justify-end pt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
