"use client";

import {
  Book,
  ChevronDown,
  FileText,
  Play,
  PlayCircle,
  ScrollText,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourseByIdForLearnPage } from "@/actions/course/course";
import ChapterContent from "@/app/(formateur)/formateur/create/[formationId]/module/_module_compoenets/ChapterContent";
import ChaptersContent from "./chaptersContent";

interface CourseModuleProps {
  courseTitle: string | undefined;
  courseDescrpeiton: string | undefined;
  chapterss: Awaited<ReturnType<typeof getCourseByIdForLearnPage>> | undefined;
  image: string | undefined;
}

export default function CourseModule({
  courseTitle,
  courseDescrpeiton,
  chapterss,
  image,
}: CourseModuleProps) {
  const chapters = [
    {
      title: "Building the Front-End",
      description:
        "Learn advanced design concepts and practical techniques for web development",
      progress: 45,
      lessons: [
        {
          title: "Introduction",
          duration: "20 minutes",
          type: "video",
          hasPreview: true,
          description: "Overview of the front-end development module",
          resources: ["Course slides", "Setup guide"],
          hasQuiz: true,
          hasAssignment: true,
        },
        {
          title: "Introduction to design fundamentals",
          duration: "20 minutes",
          type: "video",
          description: "Learn about core design principles and concepts",
          resources: ["Design guidelines", "Color theory basics"],
          hasQuiz: true,
        },
        {
          title: "Starting the creative process",
          duration: "20 minutes",
          type: "reading",
          description: "Understanding how to approach design challenges",
          resources: ["Case studies", "Project templates"],
          hasAssignment: true,
        },
        {
          title: "Composition principles and layout techniques",
          duration: "20 minutes",
          type: "video",
          description: "Master the art of layout and composition",
          resources: ["Layout examples", "Grid systems guide"],
          hasQuiz: true,
        },
      ],
    },
    {
      title: "Server-Side Development with Node.js",
      description:
        "Master server-side programming with Node.js and related technologies",
      progress: 20,
      lessons: [
        {
          title: "Node.js Fundamentals",
          duration: "25 minutes",
          type: "video",
          hasPreview: true,
          description: "Introduction to Node.js and its core concepts",
          resources: ["Node.js documentation", "Code examples"],
          hasQuiz: true,
        },
        {
          title: "Building RESTful APIs",
          duration: "30 minutes",
          type: "video",
          description: "Learn how to create robust REST APIs",
          resources: ["API design guide", "Postman collection"],
          hasAssignment: true,
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="prose dark:prose-invert">
            <h1 className="text-3xl font-bold">{courseTitle}</h1>
            <p className="text-sm text-slate-500">{courseDescrpeiton}</p>
          </div>

          <ChaptersContent chapterss={chapterss} />
        </div>

        <Card className="h-fit lg:sticky lg:top-6">
          <CardContent className="p-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={image!}
                alt="Course thumbnail"
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 space-y-4">
              <Button className="w-full" variant={"primary"}>
                Continue Learning
                <Play className="w-4 h-4 " />
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
