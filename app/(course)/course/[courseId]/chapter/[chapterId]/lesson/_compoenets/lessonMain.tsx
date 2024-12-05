import VideoLesson from "./videoLesson";
import PdfLesson from "./pdfLesson";
import { Suspense } from "react";
import QuizLesson from "./quizLesson";
import { getLessonDetailsById, getResourceById } from "@/actions/lesson/lesson";

interface LessonMainProps {
  type: string | undefined;
  resource: string | undefined;
  lessonId: string;
}

const LessonMain = async ({ resource, type, lessonId }: LessonMainProps) => {
  const lessonDetails = await getLessonDetailsById(lessonId);

  return (
    <Suspense>
      {!lessonDetails && <>error while fetching lesson</>}
      {type === "video" && (
        <VideoLesson
          video={lessonDetails?.video!}
          descreption={lessonDetails?.description!}
          title={lessonDetails?.title}
          lessonId={lessonId}
        />
      )}
      {/* {type === "pdf" && <PdfLesson res={resources} />}
      {type === "quiz" && <QuizLesson />} */}
    </Suspense>
  );
};

export default LessonMain;
