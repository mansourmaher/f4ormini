import { Header } from "@/app/_landingPageComponents/Header";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">
      <Header />
      <div className="w-screen bg-slate-100">{children}</div>
    </div>
  );
}
