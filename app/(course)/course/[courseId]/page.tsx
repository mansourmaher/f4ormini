import React from "react";
import CourseSidbar from "../_compoenets/courseSidebar";
import CourseSidbearFetchData from "../_compoenets/courseSidebFetchData";
import CourseBreadCrumbs from "../_compoenets/courseBreadcrumb";
import { getCourseTitleById } from "@/actions/course/course";
import { url } from "inspector";

const page = async ({ params }: { params: { courseId: string } }) => {
  const courseTitle = await getCourseTitleById(params.courseId);
  const links = [
    {
      name: courseTitle,
      url: `/course/${params.courseId}`,
      current: true,
    },
  ];
  return (
    <section className="">
      <CourseBreadCrumbs listofLinks={links} />
    </section>
  );
};

export default page;
