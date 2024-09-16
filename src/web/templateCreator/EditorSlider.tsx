import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@web/editor/Editor";
import { useSize } from "@web/effects";
import ParserOutput from "./ParserOutput";
import { FC, useContext, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Options } from "./TemplateOptions";
import ErrorList, { syntaxError } from "./ErrorAccordian";
import { TemplateErrorContext } from "./TemplateProvider";

const EditorSlider: FC<{ locked?: boolean }> = ({ locked }) => {
  /* const [output, setOutput] = useState(""); */
  const size = useSize();
  const { errors } = useContext(TemplateErrorContext);
  return !locked ? (
    <ResizablePanelGroup
      className="p-2"
      direction={size.width >= 640 ? "horizontal" : "vertical"}
    >
      <ResizablePanel
        className="flex p-1 outline outline-1 focus-within:shadow-lg focus-within:outline-2"
        onKeyDown={
          // This was added to ensure that the ResizablePanel's tab behaviour doesn't override codemirror's
          (e) => {
            if (e.key === "Tab") {
              e.preventDefault();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              let next = document.activeElement;
              if (next) {
                (next as HTMLElement).blur();
              }
            }
          }
        }
      >
        <Editor locked={locked} />
      </ResizablePanel>
      <ResizableHandle
        className="bg-foreground dark:bg-foreground"
        withHandle
        hitAreaMargins={{ coarse: 20, fine: 10 }}
      />
      <ResizablePanel className="max-h-full">
        <div className="h-full w-full">
          <ScrollArea className="h-full overflow-y-auto px-10">
            <ErrorList errors={errors} />
          </ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ) : (
    <Editor locked={locked} />
  );
};

export default EditorSlider;
