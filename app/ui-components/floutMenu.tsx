import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/20/solid";
import { BookOpenIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { BiDownArrow } from "react-icons/bi";

export default function FlayoutMenu() {
  return (
    <Popover className="relative isolate z-50 shadow bg-white">
      <div className="bg-white py-5">
        <div className="mx-auto max-w-7xl">
          <PopoverButton className="flex justify-between items-center p-2 w-full cursor-pointer hover:bg-blue-200">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">
                What is this course about?
              </p>
              <p className="text-sm text-slate-500">
                Module 1: 1 hour to complete
              </p>
            </div>
            <div className="flex gap-x-1 items-center font-semibold text-blue-500">
              <p>View Details</p>
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </PopoverButton>
        </div>
      </div>

      <PopoverPanel
        transition
        className="inset-x-0 top-0 -z-10 bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-600 data-[leave]:duration-350 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-4 px-6 lg:grid-cols-1 lg:px-8">
          <p className="text-sm text-slate-500">
            Dive into the world of design with our “Introduction to design”
            module covering design principles and content creation essentials,
            providing a solid foundation for your creative journey. You’ll
            explore the fundamentals of design and the role of a content
            creator, the creative process, from discovery to execution,
            composition principles and layout techniques, the importance of
            accessibility in design, and practical use of Adobe Express,
            including redeeming your premium membership. By the end of this
            module, you’ll be equipped with the knowledge and skills to create
            impactful, accessible designs using Adobe tools. Get ready to
            unleash your creativity and make your mark in the world of content
            creation!
          </p>
          <p className="font-bold">What’s included in this module:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2 flex-row">
              <VideoCameraSlashIcon className="h-6 w-6 text-blue-500" />
              <p className="text-sm text-slate-500">6 Video lessons</p>
            </div>
            <div className="flex items-center space-x-2 flex-row">
              <BookOpenIcon className="h-7 w-7 text-blue-500 rounded-full p-1" />
              <p className="text-sm text-slate-500">15 Course materials</p>
            </div>
            <div className="flex items-center space-x-2 flex-row">
              <PaperClipIcon className="h-7 w-7 text-blue-500 rounded-full p-1" />
              <p className="text-sm text-slate-500">1 Assignment</p>
            </div>
          </div>
          {/* Nested PopoverButton for additional info */}
          <Popover>
            <PopoverButton className="font-bold text-sm text-blue-500 flex items-center gap-x-2 px-2 mt-4 mb-4">
              <div className="border border-blue-500 text-blue-500 p-1 rounded-full">
                <BiDownArrow />
              </div>
              Show info about module content
            </PopoverButton>
            <PopoverPanel className="bg-white p-4 mt-2  ring-1 ring-gray-900/5">
              <p className="text-sm text-slate-500">
                This module dives deeper into advanced design concepts, ensuring
                a comprehensive understanding of practical techniques. Topics
                include color theory, typography, responsive design, and
                interactive elements for web and mobile applications.
              </p>
              <div className="mt-4">
                <p className="flex items-center space-x-2 font-bold  ">
                  <span className=" ">
                    <VideoCameraSlashIcon className="h-6 w-6 " />
                  </span>{" "}
                  <p className="">6 Video lessons</p>
                </p>
                <div className="flex flex-col gap-2 my-2 ">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-slate-500">
                      Introcution .
                      <span className="text-sm text-slate-500">
                        {" "}
                        (20 minutes) .{" "}
                      </span>
                      <span>
                        <span className="text-blue-500 font-semibold cursor-pointer">
                          Preview Model
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-2 ">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-slate-500">
                      Introduction to design fundamentals .
                      <span className="text-sm text-slate-500">
                        {" "}
                        (20 minutes) .{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-2 ">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-slate-500">
                      Starting the creative process .
                      <span className="text-sm text-slate-500">
                        {" "}
                        (20 minutes) .{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-2 ">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-slate-500">
                      Composition principles and layout techniques .
                      <span className="text-sm text-slate-500">
                        {" "}
                        (20 minutes) .{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="flex items-center space-x-2 font-bold  ">
                  <span className=" ">
                    <BookOpenIcon className="h-6 w-6 " />
                  </span>{" "}
                  <p className="">15 Course readings</p>
                </p>

                <div className="flex items-center space-x-4">
                  <p className="text-sm text-slate-500">
                    Introcution .
                    <span className="text-sm text-slate-500">
                      {" "}
                      (20 minutes) .{" "}
                    </span>
                    <span>
                      <span className="text-blue-500 font-semibold cursor-pointer">
                        Preview Model
                      </span>
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="text-sm text-slate-500">
                    Introduction to design fundamentals .
                    <span className="text-sm text-slate-500">
                      {" "}
                      (20 minutes) .{" "}
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="text-sm text-slate-500">
                    Starting the creative process .
                    <span className="text-sm text-slate-500">
                      {" "}
                      (20 minutes) .{" "}
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="text-sm text-slate-500">
                    Composition principles and layout techniques .
                    <span className="text-sm text-slate-500">
                      {" "}
                      (20 minutes) .{" "}
                    </span>
                  </p>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
