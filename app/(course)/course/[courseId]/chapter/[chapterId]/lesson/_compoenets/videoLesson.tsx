"use client";
import React from "react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Home,
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  MessageSquare,
  FileText,
  Download,
} from "lucide-react";

function VideoLesson() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Getting Started with HTML and CSS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isPlaying ? (
                  <PauseCircle className="w-16 h-16 text-white opacity-80" />
                ) : (
                  <PlayCircle className="w-16 h-16 text-white opacity-80" />
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex flex-col gap-2">
                  <Slider
                    value={[progress]}
                    max={100}
                    step={1}
                    className="w-full"
                    onValueChange={(value) => setProgress(value[0])}
                  />
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <PauseCircle className="h-6 w-6" />
                        ) : (
                          <PlayCircle className="h-6 w-6" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">0:00 / 5:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-white"
                          onClick={toggleMute}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          className="w-20"
                          onValueChange={(value) => setVolume(value[0])}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="prose max-w-none space-y-2">
                  <h2>Video: Getting Started with HTML and CSS</h2>
                  <p>Duration: 5 minutes</p>
                  <p>
                    In this introductory video, you'll learn the fundamentals of
                    HTML and CSS, the building blocks of web development. We'll
                    cover basic HTML structure, common tags, and how to style
                    your content using CSS. By the end of this video, you'll
                    have a solid foundation to start creating your own web
                    pages.
                  </p>
                  <h3>Learning Objectives:</h3>
                  <ul>
                    <li>Understand the basic structure of an HTML document</li>
                    <li>Learn common HTML tags and their purposes</li>
                    <li>Introduce CSS and its role in web design</li>
                    <li>
                      Create simple styles using CSS selectors and properties
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="transcript">
                <div className="prose max-w-none">
                  <h2>Video Transcript</h2>
                  <p>
                    [0:00] Welcome to "Getting Started with HTML and CSS". In
                    this video, we'll explore the foundations of web
                    development...
                  </p>
                  <p>
                    [0:30] Let's start with HTML. HTML stands for HyperText
                    Markup Language, and it's the backbone of every web page...
                  </p>
                  <p>
                    [2:15] Now that we understand HTML, let's move on to CSS.
                    CSS, or Cascading Style Sheets, is what makes our web pages
                    look good...
                  </p>
                  <p>
                    [4:45] To wrap up, remember that HTML provides the
                    structure, while CSS provides the style. Together, they form
                    the basis of web development...
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="notes">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Your Notes</h2>
                  <textarea
                    className="w-full h-40 p-2 border rounded-md"
                    placeholder="Type your notes here..."
                  ></textarea>
                  <Button>Save Notes</Button>
                </div>
              </TabsContent>
              <TabsContent value="resources">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Additional Resources</h2>
                  <ul className="space-y-2">
                    <li>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        HTML Cheat Sheet
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        CSS Basics Guide
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Starter Code Package
                      </Button>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as completed
              </label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Previous Lesson</Button>
              <Button>Next Lesson</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VideoLesson;
