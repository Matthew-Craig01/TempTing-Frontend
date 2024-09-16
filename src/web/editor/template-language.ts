import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { parser } from "../../lezer/lang";
import { templateHighlight } from "./syntax-highlighting";
import { autocomplete } from "./autocomplete";
import { Language, Template } from "@web/Template";
import { CompletionContext } from "@codemirror/autocomplete";

export const templateLanguage = (template: Template) => {
  const templateLanguage = LRLanguage.define({
    parser: parser.configure({ props: [templateHighlight] }),
    languageData: {
      closeBrackets: {
        brackets: ["(", "{", "'", '"'],
      },
      autocomplete: (context: CompletionContext) => {
        return autocomplete(context, template.language, template.args);
      },
    },
  });

  return new LanguageSupport(templateLanguage);
};
