import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useContext } from "react";
import { TemplateContext } from "./TemplateProvider";

const TemplateDescription: FC<{ locked?: boolean }> = ({ locked }) => {
  const { template, setTemplate } = useContext(TemplateContext);
  return (
    <div className="flex grow flex-col gap-1.5 p-2 sm:p-0">
      <Label
        className="flex justify-center text-lg font-semibold sm:block"
        htmlFor="TemplateDescription"
      >
        <p className="md:w-1/2 lg:w-full">Template Description</p>
      </Label>
      <Input
        onChange={(e) => {
          setTemplate({ ...template, description: e.target.value });
        }}
        id="TemplateDescription"
        placeholder="Optional"
        value={template.description}
        disabled={locked}
      />
    </div>
  );
};

export default TemplateDescription;
