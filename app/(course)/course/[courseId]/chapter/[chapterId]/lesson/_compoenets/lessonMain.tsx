"use client";
import React from "react";
import VideoLesson from "./videoLesson";
import PdfLesson from "./pdfLesson";
import { URLSearchParams } from "url";
import { useSearchParams } from "next/navigation";

function LessonMain() {
  const params = useSearchParams();
  const lessonType = params.get("type");

  return (
    <div>
      {lessonType === "video" && <VideoLesson />}
      {lessonType === "pdf" && <PdfLesson />}
    </div>
  );
}

export default LessonMain;
