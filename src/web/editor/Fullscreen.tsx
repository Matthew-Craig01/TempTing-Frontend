import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { FC, ReactNode } from "react";

const defaultTrigger = (
  <div className="absolute right-0 top-0 pb-10 pl-10 opacity-75 hover:opacity-100">
    <DialogTrigger asChild>
      <Button size="icon">
        <Maximize2 />
      </Button>
    </DialogTrigger>
  </div>
);

export const ConditionalFullscreen: FC<{
  children: ReactNode;
  alwaysShowChildren?: boolean;
  trigger?: ReactNode;
}> = ({ children, alwaysShowChildren = true, trigger = defaultTrigger }) => {
  return (
    <Dialog>
      <div className="relative flex w-full grow justify-center">
        {alwaysShowChildren ? (
          <div className="flex w-full bg-background text-primary">
            {children}
          </div>
        ) : (
          <></>
        )}
        {trigger}
        <DialogContent className="flex h-5/6 w-11/12 grow bg-background text-primary sm:h-3/4 sm:w-3/4">
          {children}
          <DialogClose className="absolute right-0 top-0" asChild>
            <div className="p-10 opacity-75 hover:opacity-100">
              <Button size="icon">
                <Minimize2 />
              </Button>
            </div>
          </DialogClose>
        </DialogContent>
      </div>
    </Dialog>
  );
};
