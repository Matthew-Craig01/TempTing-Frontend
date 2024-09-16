import { Button } from "@/components/ui/button";
import * as React from "react";
import GithubIcon from "@web/icons/GithubIcon";
import { cn } from "@/lib/utils";
import DarkMode from "./DarkMode";

export const Right = () => {
  return (
    <div className="flex justify-center gap-1 pr-2 text-foreground sm:justify-between">
      <a href="https://github.com/Matthew-Craig01/TempTing">
        <Button variant="outline" size="icon" className="rounded-full">
          <GithubIcon></GithubIcon>
        </Button>
      </a>
      <DarkMode></DarkMode>
    </div>
  );
};

export default Right;
