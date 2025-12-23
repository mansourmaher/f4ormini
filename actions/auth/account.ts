"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

interface UpdateUserProfileData {
  // Personal Information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  age?: string;
  bio?: string;
  profileImage?: string;

  // Location
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;

  // Financial Information
  employmentStatus?: string;
  occupation?: string;
  employer?: string;
  annualSalary?: string;
  netWorth?: string;
  totalDebt?: string;
  creditScore?: string;

  // Preferences
  buyerSeller?: string;
  budgetRange?: string;
  preferredBrands?: string;

  // Notifications
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  gender:string
}

export async function getUserProfile() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        age: true,
        bio: true,
        profileImage: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        employmentStatus: true,
        occupation: true,
        employer: true,
        annualSalary: true,
        netWorth: true,
        totalDebt: true,
        creditScore: true,
        buyerSeller: true,
        budgetRange: true,
        preferredBrands: true,
        emailNotifications: true,
        smsNotifications: true,
        gender:true,
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: "Failed to fetch user profile" };
  }
}

export async function updateUserProfile(data: UpdateUserProfileData) {

  console.log('am he')
  try {
    const session = await auth();

    console.log("am here 1")
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    console.log('am here222')

    // Convert string values to appropriate types
    const updateData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      bio: data.bio,
      profileImage: data.profileImage,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      employmentStatus: data.employmentStatus,
      occupation: data.occupation,
      employer: data.employer,
      creditScore: data.creditScore,
      buyerSeller: data.buyerSeller,
      budgetRange: data.budgetRange,
      preferredBrands: data.preferredBrands,
      emailNotifications: data.emailNotifications,
      smsNotifications: data.smsNotifications,
      gender:data.gender
    };

    // Convert date string to DateTime
    if (data.dateOfBirth) {
      updateData.dateOfBirth = new Date(data.dateOfBirth);
    }

    // Convert string numbers to integers/floats
    if (data.age) {
      updateData.age = parseInt(data.age);
    }
    if (data.annualSalary) {
      updateData.annualSalary = parseFloat(data.annualSalary);
    }
    if (data.netWorth) {
      updateData.netWorth = parseFloat(data.netWorth);
    }
    if (data.totalDebt) {
      updateData.totalDebt = parseFloat(data.totalDebt);
    }

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        age: true,
        bio: true,
        profileImage: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        employmentStatus: true,
        occupation: true,
        employer: true,
        annualSalary: true,
        netWorth: true,
        totalDebt: true,
        creditScore: true,
        buyerSeller: true,
        budgetRange: true,
        preferredBrands: true,
        emailNotifications: true,
        smsNotifications: true,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update user profile" };
  }
}