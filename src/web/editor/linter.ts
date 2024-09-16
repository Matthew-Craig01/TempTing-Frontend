import { linter, Diagnostic } from "@codemirror/lint";
import { ErrMsg, get_args, get_roles, parse_template, Pos } from "@gleam/api";
import { Language, Template } from "@web/Template";
import { Element$ } from "@gleam/build/dev/javascript/temp_ting/parser/template.mjs";
import { nullRoles, universalDependencies } from "./universalDependencies";

export const templateLinter = (
  template: Template,
  syntaxErrors: ErrMsg[],
  setSyntaxErrors: (syntax: ErrMsg[]) => void,
  pArgErrors: string[],
  setPArgErrors: (err: string[]) => void,
  roleErrors: string[],
  setRoleErrors: (err: string[]) => void,
) => {
  return linter((view) => {
    const diagnostics: Diagnostic[] = [];
    const parsed = parse_template(view.state.doc.toString());

    if (parsed.ok) {
      if (syntaxErrors.length !== 0) {
        setSyntaxErrors([]);
      }
      lintArgs(
        template.args,
        parsed.value as Element$[],
        pArgErrors,
        setPArgErrors,
      );
      lintRoles(
        template.language,
        parsed.value as Element$[],
        roleErrors,
        setRoleErrors,
      );
      return diagnostics;
    }

    const errs = parsed.value as ErrMsg[];
    if (!areEqual(errs, syntaxErrors)) {
      setSyntaxErrors(errs);
    }
    errs.map((e) => {
      let to =
        view.state.doc.length > e.to.char + 1
          ? view.state.doc.length
          : e.to.char + 1;
      diagnostics.push({
        from: e.from.char,
        to: to,
        severity: "error",
        message: e.msg,
      });
    });
    return diagnostics;
  });
};

const areEqual = (a: ErrMsg[], b: ErrMsg[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((msg1, index) => {
    const msg2 = b[index];
    return (
      msg1.msg === msg2.msg &&
      posEqual(msg1.from, msg2.from) &&
      posEqual(msg1.to, msg2.to)
    );
  });
};

const posEqual = (pos1: Pos, pos2: Pos): boolean => {
  return (
    pos1.ln === pos2.ln && pos1.col === pos2.col && pos1.char === pos2.char
  );
};

const lintArgs = (
  args: string[],
  parsed: Element$[],
  oldErrs: string[],
  setArgErrors: (err: string[]) => void,
) => {
  const pArgs = get_args(parsed);
  let newErrs: string[] = [];
  for (const pArg of pArgs) {
    if (!args.includes(pArg)) {
      newErrs = [...newErrs, pArg];
    }
  }
  if (!stringArrEqual(newErrs, oldErrs)) {
    setArgErrors(newErrs);
  }
};

const lintRoles = (
  language: Language | null,
  parsed: Element$[],
  oldErrs: string[],
  setRoleErrs: (err: string[]) => void,
) => {
  const validRoles =
    language === null
      ? nullRoles
      : (universalDependencies.get(language) ?? nullRoles);
  const roles = get_roles(parsed);
  let newErrs: string[] = [];
  for (const role of roles) {
    if (!validRoles.includes(role)) {
      newErrs = [...newErrs, role];
    }
  }
  if (!stringArrEqual(newErrs, oldErrs)) {
    setRoleErrs(newErrs);
  }
};

const stringArrEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((erra, index) => {
    const errb = b[index];
    return erra === errb;
  });
};
