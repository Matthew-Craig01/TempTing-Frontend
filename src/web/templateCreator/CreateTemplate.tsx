import { FC, useState } from "react";
import { useSize } from "@web/effects";
import { MobileOptions, Options } from "./TemplateOptions";
import EditorSlider from "./EditorSlider";
import { SaveButton, PublishButton } from "./SavePublish";
import { Template } from "@web/Template";
import {
  defaultErrors,
  empty,
  TemplateContext,
  TemplateErrorContext,
} from "./TemplateProvider";
import { useLocation } from "react-router-dom";

const CreateTemplate: FC<{
  locked?: boolean;
  start?: Template;
}> = ({ locked, start }) => {
  const size = useSize();
  const { dynamicStart, fixedArgs } = useLocation().state ?? {};
  if (dynamicStart !== undefined) {
    start = dynamicStart;
  }
  const [template, setTemplate] = useState(start === undefined ? empty : start);
  const [errors, setErrors] = useState(defaultErrors);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      <TemplateErrorContext.Provider value={{ errors, setErrors }}>
        <div className="flex h-full flex-auto flex-col gap-10 overflow-y-hidden p-10">
          {size.width < 640 ? (
            <MobileOptions />
          ) : (
            <Options fixedArgs={fixedArgs} locked={locked} />
          )}
          <EditorSlider locked={locked} />
          <div className="flex flex-col justify-between sm:flex-row">
            <span className="text-right text-lg font-bold">
              {getCreationText(template, locked === undefined ? false : locked)}
            </span>
            <div className="flex justify-end gap-5">
              {!locked ? (
                <>
                  <SaveButton />
                  <PublishButton />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </TemplateErrorContext.Provider>
    </TemplateContext.Provider>
  );
};

const getCreationText = (template: Template, locked: boolean) => {
  const published = template.publishedId !== -1;
  const version = template.versionId !== -1;
  if (locked) {
    return "Viewing Template";
  }
  if (published && version) {
    return "Editing template.";
  }
  if (published) {
    return "New variant for existing template.";
  }
  return "New template.";
};

export default CreateTemplate;
