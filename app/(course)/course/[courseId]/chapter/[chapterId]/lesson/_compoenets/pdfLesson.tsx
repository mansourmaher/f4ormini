"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

import PdfViewr from "@/app/(course)/course/_compoenets/pdfViewer";

function PdfLesson() {
  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>CV_2024-10-15_Mansour_Maher.pdf</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* PDF Viewer Placeholder */}
        <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          {/* <FileText className="h-24 w-24 text-gray-400" /> */}
          <PdfViewr />
        </div>

        {/* PDF Controls */}

        {/* Reading Information */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              Reading: CV_2024-10-15_Mansour_Maher.pdf
            </h2>
            <p className="text-sm text-muted-foreground">
              Estimated reading time: 5 min
            </p>
          </div>
          <div className="prose max-w-none">
            <p>
              This document contains important information related to the course
              content. Please read it carefully and refer back to it as needed
              throughout the course. You may find it helpful to take notes or
              highlight key points as you read.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PdfLesson;