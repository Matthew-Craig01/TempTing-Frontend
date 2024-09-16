import { syntaxTree } from "@codemirror/language";
import { CompletionContext } from "@codemirror/autocomplete";
import { Language } from "@web/Template";
import { nullRoles, universalDependencies } from "./universalDependencies";

export const autocomplete = (
  context: CompletionContext,
  language: Language | null,
  args: string[],
) => {
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
  let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
  let tagBefore = /\w*$/.exec(textBefore);
  if (!tagBefore && !context.explicit) return null;

  let from = tagBefore ? nodeBefore.from + tagBefore.index : context.pos;
  if (nodeBefore.name === "Role") {
    return {
      from: from,
      options: roleOptions(language),
    };
  }
  if (nodeBefore.name === "Interpolation") {
    return {
      from: from,
      options: argOptions(args),
    };
  }
  return null;
};

const roleOptions = (l: Language | null) => {
  let options: string[] = [];
  if (l === null) {
    options = nullRoles;
  } else {
    options = universalDependencies.get(l) ?? [];
  }
  return options.map((role) => ({ label: role, type: "enum" }));
};

const argOptions = (args: string[]) => {
  return args.map((arg) => ({ label: arg, type: "variable" }));
};
