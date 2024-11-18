import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/app/_landingPageComponents/Header";
import Navbar from "@/app/_landingPageComponents/Navbar";
import CourseSidbar from "../_compoenets/courseSidebar";
import CourseSidbearFetchData from "../_compoenets/courseSidebFetchData";
import CourseBreadCrumbs from "../_compoenets/courseBreadcrumb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const LayoutPage = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: string };
}>) => {
  return (
    <div>
      <CourseSidbearFetchData courseId={params.courseId} />
      <div className="flex flex-col min-h-screen bg-slate-100">
        <main className="flex-grow lg:pl-80 mt-8">{children}</main>
      </div>
    </div>
  );
};
export default LayoutPage;