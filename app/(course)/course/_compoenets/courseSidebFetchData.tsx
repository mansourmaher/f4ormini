import { getAllchaptersPerCourse } from "@/actions/chapter/chapter";
import React from "react";
import CourseSidbar from "./courseSidebar";

interface Props {
  courseId: string;
}

const CourseSidbearFetchData = async ({ courseId }: Props) => {
  const chapters = await getAllchaptersPerCourse(courseId);

  return <CourseSidbar chapters={chapters} courseId={courseId} />;
};

export default CourseSidbearFetchData;
