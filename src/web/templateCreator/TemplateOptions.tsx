import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import TemplateName from "./TemplateName";
import TemplateLanguage from "./LanguageSelector";
import TemplateArgs from "./TemplateArgs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TemplateDescription from "./TemplateDescription";
import { FC } from "react";

export const Options: FC<{ locked?: boolean; fixedArgs?: boolean }> = ({
  locked,
  fixedArgs,
}) => {
  return (
    <>
      <div className="flex flex-col justify-between gap-10 sm:flex-row">
        <TemplateName locked={locked} />
        <TemplateDescription locked={locked} />
        <TemplateLanguage locked={locked} />
      </div>
      <TemplateArgs fixedArgs={fixedArgs} locked={locked} />
    </>
  );
};

export const MobileOptions = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="gap-5">
          Template Options <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-screen text-foreground">
        <ScrollArea className="overflow-y-scroll">
          <div className="mx-auto w-full max-w-sm">
            <Options />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
