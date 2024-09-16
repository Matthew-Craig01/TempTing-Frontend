import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Language, Template } from "@web/Template";
import { FC } from "react";
import { BrowseTemplate } from "./TemplateBrowser";
import { ConditionalFullscreen } from "@web/editor/Fullscreen";
import CreateTemplate from "@web/templateCreator/CreateTemplate";
import { DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export const TemplateCard: FC<{ template: BrowseTemplate }> = ({
  template,
}) => {
  const t = template.template;
  const lang = t.language as Language;
  const l = lang.charAt(0).toUpperCase() + lang.slice(1);
  const date = new Date(t.date as string);
  const navigate = useNavigate();

  return (
    <Card className="w-80 max-w-80">
      <CardHeader>
        <CardTitle className="text-lg">{t.title}</CardTitle>
        <CardDescription>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="max-w-full">
                <div className="truncate">
                  {t.description === "" ? "No description" : t.description}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="wrap max-w-96">
                  {t.description === "" ? "No description" : t.description}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-bold">
          Languange: <span className="font-normal">{l}</span>
        </div>
        <div className="font-bold">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                Arguments: <span className="font-normal">{t.args.length}</span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="wrap max-w-96">{t.args.join(", ")}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="font-bold">
          Last Edited: <span className="font-normal">{ago(date)} ago</span>
        </div>
        <div className="font-bold">
          Last Editor: <span className="font-normal">{t.username}</span>
        </div>
        <div className="font-bold">
          Creator: <span className="font-normal">{template.creator}</span>
        </div>
        <a href={"/browse/variants/" + t.publishedId}>
          <div className="underline">Language Variants</div>
        </a>
      </CardContent>
      <CardFooter className="flex justify-between gap-5">
        <ConditionalFullscreen
          trigger={
            <DialogTrigger asChild>
              <Button variant="outline">View</Button>
            </DialogTrigger>
          }
          alwaysShowChildren={false}
        >
          <CreateTemplate start={t} locked />
        </ConditionalFullscreen>
        <Button
          onClick={() => {
            navigate(`/create/${t.publishedId}/`, {
              state: {
                dynamicStart: {
                  ...t,
                  language: null,
                  versionId: -1,
                  title: "",
                } as Template,
                fixedArgs: true,
              },
            });
          }}
          variant="outline"
        >
          New Variant
        </Button>
        <Button
          onClick={() => {
            navigate(`/create/${t.publishedId}/${t.versionId}/`, {
              state: { dynamicStart: t },
            });
          }}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

const ago = (date: Date) => {
  const now = new Date();
  const diffS = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffS < 60) {
    const suffix = diffS === 1 ? "second" : "seconds";
    return diffS + " " + suffix;
  }
  const diffM = Math.floor(diffS / 60);
  if (diffM < 60) {
    const suffix = diffS === 1 ? "minute" : "minutes";
    return diffM + " " + suffix;
  }
  const diffH = Math.floor(diffM / 60);
  if (diffH < 24) {
    const suffix = diffS === 1 ? "hour" : "hours";
    return diffH + " " + suffix;
  }
  const diffD = Math.floor(diffH / 24);
  if (diffH < 30) {
    const suffix = diffS === 1 ? "day" : "days";
    return diffD + " " + suffix;
  }
  const diffMo = Math.floor(diffD / 30);
  const suffix = diffS === 1 ? "month" : "months";
  return diffMo + " " + suffix;
};
