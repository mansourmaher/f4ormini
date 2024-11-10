// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Upload, Video } from "lucide-react";

// function UploadLessonVideo() {
//   return (
//     <div className="space-y-2">
//       <Label>Video Content</Label>
//       <Card className="border-dashed">
//         <CardContent className="p-6">
//           <div className="flex flex-col items-center justify-center space-y-4">
//             <Video className="w-12 h-12 text-muted-foreground" />
//             <div className="space-y-2 text-center">
//               <h3 className="font-medium">Upload Video</h3>
//               <p className="text-sm text-muted-foreground">
//                 Drag and drop your video file here
//               </p>
//             </div>
//             <Button variant="secondary">
//               <Upload className="w-4 h-4 mr-2" />
//               Choose File
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

//  export default UploadLessonVideo;
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { Video as VideoIcon, Upload } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadLessonVideoProps {
  initialVideoUrl: string | null | undefined;
  onVideoChange(url: string): void;
}

function UploadLessonVideo({
  initialVideoUrl,
  onVideoChange,
}: UploadLessonVideoProps) {
  const [video, setVideo] = useState(initialVideoUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { startUpload } = useUploadThing("lessonVideo", {
    onUploadError: (error) => {
      setError(error.message);
      setLoading(false);
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  return (
    <div className="space-y-2">
      <Label>Video Content</Label>
      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors max-h-[480px]">
        <Dropzone
          accept={{ "video/*": [] }}
          onDrop={async (acceptedFiles) => {
            setLoading(true);
            setError(null);
            const res = await startUpload(acceptedFiles);
            setLoading(false);

            if (res) {
              setVideo(res[0].url);
              onVideoChange(res[0].url);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} />
              {video ? (
                <video
                  src={video}
                  controls
                  className="w-full max-h-[380px] rounded-lg"
                />
              ) : (
                <>
                  {error && (
                    <p className="text-xs text-red-500 mt-2">{error}</p>
                  )}
                  {loading && (
                    <>
                      <p className="text-xs text-muted-foreground mt-2">
                        Uploading...
                      </p>
                      <Progress
                        value={progress}
                        className={cn(
                          "h-1",
                          progress === 100 ? "bg-primary" : "bg-gray-300"
                        )}
                      />
                    </>
                  )}
                  {!loading && (
                    <>
                      <VideoIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div className="mt-4">
                        <Button variant="secondary">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Video
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Drag and drop your video file here or click to upload
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default UploadLessonVideo;
