import FlyoutMenu from "@/app/ui-components/floutMenu";
import Image from "next/image";
import logo from "../../images/logo2.webp";

function CourseModule() {
  return (
    <section
      id="course-module"
      className="bg-white border-b-2 p-4  mx-auto py-14 "
    >
      <div className="space-y-4 grid lg:grid-cols-6 items-start  gap-x-8">
        <div className="col-span-4 space-y-4">
          <h1 className="text-2xl font-extrabold">
            There are 3 modules in this course
          </h1>
          <p className="text-sm text-slate-500 ">
            Based on one of the most popular open online courses in the world,
            this course gives you easy access to the learning techniques used by
            experts in art, music, literature, math, science, sports, and many
            other disciplines. No matter what your current skill level, using
            these approaches can help you master new topics, change your
            thinking and improve your life
          </p>
          <div className="container mx-auto border rounded-lg ">
            <div className="grid grid-cols-1 gap-4">
              <FlyoutMenu />
              <FlyoutMenu />
              <FlyoutMenu />
            </div>
          </div>
        </div>
        <div className="hidden sm:hidden md:hidden lg:block col-span-2 ">
          <div className="shadow-lg md:rounded-3xl">
            <div className="bg-indigo-500  [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div
                className="absolute   ml-10  skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div className="mx-auto  md:mx-0 ">
                  <div className=" overflow-hidden rounded-tl-xl bg-gray-900">
                    <Image
                      src={logo}
                      alt="User"
                      className="object-cover"
                      width={400}
                    />
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseModule;
