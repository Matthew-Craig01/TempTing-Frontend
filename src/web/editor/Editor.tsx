import { useState, useEffect, FC, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { extensions } from "./extensions";
import { useTheme } from "@/components/theme-provider";
import { githubLight, githubDark } from "./syntax-highlighting";
import { ErrMsg, parse_template } from "@gleam/api";
import ZoomButtons from "./ZoomButtons";
import { ConditionalFullscreen } from "./Fullscreen";
import { useSize } from "@web/effects";
import {
  TemplateContext,
  TemplateErrorContext,
} from "@web/templateCreator/TemplateProvider";
import { templateLinter } from "./linter";
import { templateLanguage } from "./template-language";

const Editor: FC<{ locked?: boolean }> = ({ locked }) => {
  const { theme } = useTheme();
  const [zoom, setZoom] = useState(100);
  const { template, setTemplate } = useContext(TemplateContext);
  const { errors, setErrors } = useContext(TemplateErrorContext);
  const size = useSize();
  const tooltipFontSize = 1.1 / (1 + Math.pow(9, (zoom / 100 - 0.8) * -1));
  document.documentElement.style.setProperty(
    "--tooltip-font-size",
    tooltipFontSize + "em",
  );

  return (
    <ConditionalFullscreen>
      <div className="relative h-full w-full">
        <CodeMirror
          placeholder={
            size.width >= 768
              ? "Enter your template here..."
              : "Enter your \ntemplate here..."
          }
          editable={!locked}
          basicSetup={false}
          extensions={[
            ...extensions,
            templateLinter(
              template,
              errors.syntax,
              (syntax: ErrMsg[]) => {
                setErrors({ ...errors, syntax: syntax });
              },
              errors.parsedArgs,
              (pArgErrs: string[]) => {
                setErrors({ ...errors, parsedArgs: pArgErrs });
              },
              errors.role,
              (roleErrs: string[]) => {
                setErrors({ ...errors, role: roleErrs });
              },
            ),
            templateLanguage(template),
          ]}
          autoFocus={true}
          value={template.raw}
          theme={
            theme == "light"
              ? githubLight((1.3 * zoom) / 100)
              : githubDark((1.3 * zoom) / 100)
          }
          onChange={(value) => {
            setTemplate({ ...template, raw: value });
          }}
        />
        <ZoomButtons zoom={zoom} setZoom={setZoom}></ZoomButtons>
      </div>
    </ConditionalFullscreen>
  );
};

export default Editor;
