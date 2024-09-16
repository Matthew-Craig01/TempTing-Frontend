import { Component, FC, useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideMessageCircleWarning, TriangleAlert } from "lucide-react";
import { ErrMsg } from "@gleam/api";
import {
  errorCount,
  TemplateContext,
  TemplateErrors,
} from "./TemplateProvider";
import { ArgError } from "./TemplateArgs";
import { Button } from "@/components/ui/button";
import { ConditionalFullscreen } from "@web/editor/Fullscreen";
import ParserOutput from "./ParserOutput";
import { DialogTrigger } from "@/components/ui/dialog";
import { Language } from "@web/Template";

export const ErrorAccordian: FC<{ title: string; errors: string[] }> = ({
  title,
  errors,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <TriangleAlert color="red" />
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            {errors.map((msg, i) => (
              <div
                className="whitespace-pre-line break-words border border-solid border-foreground p-2 font-mono"
                key={"eAccordian-" + i}
              >
                {msg}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const ErrorList: FC<{ errors: TemplateErrors }> = ({ errors }) => {
  const { template } = useContext(TemplateContext);
  return (
    <>
      {errors.title !== null ? (
        <ErrorAccordian title="Title Errors" errors={[errors.title]} />
      ) : (
        <></>
      )}
      {errors.language ? (
        <ErrorAccordian
          title="Language Errors"
          errors={[
            "Please select a language. Templates must be assigned a specifc language.",
          ]}
        />
      ) : (
        <></>
      )}
      {errors.args.length > 0 || errors.parsedArgs.length > 0 ? (
        <ErrorAccordian
          title="Argument Errors"
          errors={[
            ...errors.args.map((e) => argError(e)),
            ...errors.parsedArgs.map((e) => parsedArgError(e)),
          ]}
        />
      ) : (
        <></>
      )}
      {errors.syntax.length !== 0 ? (
        <ErrorAccordian
          title="Syntax Errors"
          errors={errors.syntax.map((e) => syntaxError(e))}
        />
      ) : (
        <></>
      )}
      {errors.role.length !== 0 ? (
        <ErrorAccordian
          title="Role Errors"
          errors={errors.role.map((e) => roleError(e, template.language))}
        />
      ) : (
        <></>
      )}
      {errorCount(errors) === 0 ? (
        <div className="flex h-full flex-col justify-center gap-10">
          <div className="flex justify-center text-lg font-bold">
            No errors.
          </div>
          <ConditionalFullscreen
            trigger={
              <div className="flex w-full justify-center">
                <DialogTrigger asChild>
                  <Button>View Parser Output.</Button>
                </DialogTrigger>
              </div>
            }
            alwaysShowChildren={false}
          >
            <ParserOutput />
          </ConditionalFullscreen>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const syntaxError = (e: ErrMsg) => {
  return "Line: " + e.from.ln + " | Column: " + e.from.col + "\n" + e.msg;
};

export const argError = (e: ArgError) => {
  return "Argument " + e.index + ": " + e.arg + "\n" + e.message;
};

export const parsedArgError = (e: string) => {
  return (
    "`" +
    e +
    "` is used as an argument invocation in template. `" +
    e +
    "` does not exist in argument list."
  );
};

export const roleError = (e: string, language: Language | null) => {
  const l = language ?? "None";
  return (
    "`" +
    e +
    "` is used as a role. `" +
    e +
    "` is not a valid role for language: " +
    l
  );
};

export default ErrorList;
