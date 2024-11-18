"use client";
import React from "react";
import VideoLesson from "./videoLesson";
import PdfLesson from "./pdfLesson";
import { URLSearchParams } from "url";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LessonMain() {
  const params = useSearchParams();
  const lessonType = params.get("type");

  return (
    <Suspense>
      {lessonType === "video" && <VideoLesson />}
      {lessonType === "pdf" && <PdfLesson />}
    </Suspense>
  );
}

export default LessonMain;
