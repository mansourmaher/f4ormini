import React from "react";
import { AccountSetupForm } from "../_components/setup_account_form";
import { Header } from "@/app/_landing_component/header";
import { Footer } from "@/app/_landing_component/footer";
import { auth } from "@/auth";

async function page() {
  const user = await auth();
  console.log("Authenticated user:", user);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-8xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Setup Your Account</h1>
            <p className="text-lg text-muted-foreground">
              Complete your profile to get the best experience
            </p>
          </div>
          <AccountSetupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;
