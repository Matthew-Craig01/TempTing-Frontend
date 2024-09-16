import { useState, createContext, FC } from "react";
import { Language, Template } from "@web/Template";
import { ErrMsg } from "@gleam/api";
import { ArgError } from "./TemplateArgs";

export const empty: Template = {
  title: "",
  description: "",
  publishedId: -1,
  versionId: -1,
  args: [],
  language: null,
  raw: "",
  date: null,
  username: "",
};

export const TemplateContext = createContext({
  template: empty,
  setTemplate: (t: Template) => {},
});

export type TemplateErrors = {
  syntax: ErrMsg[];
  language: boolean;
  args: ArgError[];
  parsedArgs: string[];
  title: string | null;
  role: string[];
};

export const errorCount = (es: TemplateErrors) => {
  const syntax = es.syntax.length;
  const language = es.language ? 1 : 0;
  const args = es.args.length;
  const title = es.title === null ? 0 : 1;
  const parsedArgs = es.parsedArgs.length;
  const role = es.role.length;
  return syntax + language + args + title + parsedArgs + role;
};

export const defaultErrors: TemplateErrors = {
  syntax: [],
  language: true,
  args: [],
  parsedArgs: [],
  role: [],
  title: null,
};

export const TemplateErrorContext = createContext({
  errors: defaultErrors,
  setErrors: (e: TemplateErrors) => {},
});
