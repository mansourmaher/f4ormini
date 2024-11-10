"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, X, Plus } from "lucide-react";
import UploadLessonResource from "./AddResources";
import { addResourceToLesson } from "@/actions/lesson/lesson";
import { useRouter } from "next/navigation";
import { list } from "postcss";

interface ChapterResourceProps {
  resourcess: { id: string; title: string; url: string }[] | undefined;
  lessonId: string;
}

function ChapterResource({ resourcess, lessonId }: ChapterResourceProps) {
  const router = useRouter();
  const [resUrl, setResUrl] = useState<string | null>(null);
  const [resName, setResName] = useState<string | null>(null);
  const [tabOfnewResource, setTabOfnewResource] = useState<
    { title: string; url: string }[]
  >([]);
  const [resources, setResources] = useState(resourcess || []);

  const onFileChange = (list: { title: string; url: string }[]) => {
    setTabOfnewResource((prevTabOfNewResource) => [
      ...prevTabOfNewResource,
      ...list,
    ]);

    console.log("Updated tabOfnewResource:", tabOfnewResource);
  };

  const onSubmit = async () => {
    console.log(tabOfnewResource);
    await addResourceToLesson(lessonId, tabOfnewResource);
    setTabOfnewResource([]);
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments & Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assignments">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="assignments" className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Cahier-de-charges (1).pdf</p>
                  <p className="text-sm text-muted-foreground">
                    Added on Oct 31, 2023
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <ScrollArea className="h-[200px] rounded-lg border p-4">
              {/* Display initial resources */}
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{resource.title}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {/* Display new resources (not yet uploaded) */}
            </ScrollArea>
            <UploadLessonResource onFileChange={onFileChange} />
            {tabOfnewResource.length > 0 && (
              <div className="flex items-center justify-center flex-col">
                <span>
                  <p className="text-sm text-muted-foreground">
                    {tabOfnewResource.length} ready to be saved
                  </p>
                </span>

                <Button
                  variant="primary"
                  onClick={onSubmit}
                  className=" mt-2"
                  size={"sm"}
                >
                  Save New Resources
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default ChapterResource;
