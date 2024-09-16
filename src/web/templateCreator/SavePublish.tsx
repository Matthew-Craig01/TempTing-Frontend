import React, { FC, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Template } from "@web/Template";
import { User, useUser } from "@web/user/UserProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/hooks/use-toast";
import {
  errorCount,
  TemplateContext,
  TemplateErrorContext,
  TemplateErrors,
} from "./TemplateProvider";

type T = "save" | "publish";

export const SaveButton = () => {
  return <SavePublishButton t="save"></SavePublishButton>;
};

export const PublishButton = () => {
  return <SavePublishButton t="publish"></SavePublishButton>;
};

const SavePublishButton: FC<{
  t: T;
}> = ({ t }) => {
  const { user, sessionKey } = useUser();
  const key = sessionKey();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { template, setTemplate } = useContext(TemplateContext);
  const { errors } = useContext(TemplateErrorContext);
  return (
    <Button
      onClick={(_) => {
        if (user === null || key === undefined) {
          navigate("/signin");
        } else {
          savePublish(user, key, template, errors, t).then((res) => {
            const [ok, json] = res;
            if (ok) {
              toast({ title: "Success" });
              if (t === "save") {
                handleSave(json);
              } else {
                handlePublish(json, template, setTemplate);
              }
            } else {
              toast({
                title: "Error",
                description: decodeError(json),
                variant: "destructive",
              });
            }
          });
        }
      }}
      variant={t === "save" ? "outline" : "default"}
    >
      {t === "save" ? "Save Draft" : "Publish Template"}
    </Button>
  );
};

const savePublish = async (
  username: User,
  sessionKey: string,
  template: Template,
  errors: TemplateErrors,
  t: T,
) => {
  if (t === "publish" && errorCount(errors) > 0) {
    return [false, "PUBLISH_ERROR"];
  }
  if (t === "save" && (errors.language === true || errors.title !== null)) {
    return [false, "SAVE_ERROR"];
  }
  const apiPath = "/api/" + t;
  const toSubmit = {
    sessionKey: sessionKey,
    username: username,
    template: { ...template, username: username, date: "" },
  };
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSubmit),
  };
  try {
    const response = await fetch(apiPath, request);
    const json = await response.json();
    return [response.ok, json];
  } catch (error) {
    return [false, "NETWORK"];
  }
};

type ErrorResponse =
  | "INVALID_SESSION_KEY"
  | "INVALID_USER"
  | "DB_ERR"
  | "NETWORK"
  | "SAVE_ERROR"
  | "PUBLISH_ERROR";

const decodeError = (message: ErrorResponse) => {
  switch (message) {
    case "INVALID_SESSION_KEY":
    case "INVALID_USER":
      return "Invalid session, Please login again.";
    case "DB_ERR":
      return "Server error. Please try again later.";
    case "PUBLISH_ERROR":
      return "Please ensure that your template is error-free before publishing.";
    case "SAVE_ERROR":
      return "Unable to save draft without first specifying template title and language.";
    default:
      return "Network errror. Unable to connect to the server.";
  }
};

const handlePublish = (
  json: { published_id: number; version_id: number },
  template: Template,
  setTemplate: (t: Template) => void,
) => {
  const { published_id, version_id } = json;
  setTemplate({
    ...template,
    publishedId: published_id,
    versionId: version_id,
  });
};

const handleSave = (json: string) => {
  const { id } = JSON.parse(json);
};
