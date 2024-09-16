import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useContext, useEffect } from "react";
import { TemplateContext, TemplateErrorContext } from "./TemplateProvider";
import { checkIdentifier } from "./checkIdentifier";

const TemplateName: FC<{ locked?: boolean }> = ({ locked }) => {
  const { template, setTemplate } = useContext(TemplateContext);
  const { errors, setErrors } = useContext(TemplateErrorContext);

  const onChange = (title: string) => {
    setTemplate({ ...template, title: title });
    const nameErrs = checkErrors(title);
    setErrors({ ...errors, title: nameErrs });
  };

  useEffect(() => {
    onChange(template.title);
  }, []);

  return (
    <div className="flex grow flex-col gap-1.5 p-2 sm:p-0">
      <Label
        className="flex justify-center text-lg font-semibold sm:block"
        htmlFor="TemplateName"
      >
        <p className="md:w-1/2 lg:w-full">Template Title</p>
      </Label>
      <Input
        disabled={locked}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        id="TemplateName"
        placeholder="Required"
        value={template.title}
      />
    </div>
  );
};

const checkErrors = (name: string) => {
  if (name === "") {
    return "Template title cannot be be empty.";
  }
  const banned = checkIdentifier(name);
  if (banned === null) {
    return null;
  }
  return "`" + banned + "`" + " is not allowed in template title.";
};

export default TemplateName;
