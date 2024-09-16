import CodeMirror from "@uiw/react-codemirror";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, useContext } from "react";
import { TemplateContext } from "./TemplateProvider";
import { parse_template, ErrMsg, stringify } from "@gleam/api";
import * as v from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { githubDark, githubLight } from "@web/editor/syntax-highlighting";
import { useTheme } from "@/components/theme-provider";

export const ParserOutput: React.FC<{}> = () => {
  const { template } = useContext(TemplateContext);
  const output = stringify(parse_template(template.raw).value);

  const { theme } = useTheme();
  return (
    <ScrollArea className="max-h-full w-full overflow-y-auto">
      <div className="max-h-full w-full hyphens-auto break-words break-all p-2 text-foreground">
        <CodeMirror
          basicSetup={false}
          extensions={[v.lineNumbers(), v.EditorView.lineWrapping, json()]}
          readOnly
          autoFocus={true}
          value={output}
          theme={theme == "light" ? githubLight(1.3) : githubDark(1.3)}
        />
      </div>
    </ScrollArea>
  );
};

export default ParserOutput;
