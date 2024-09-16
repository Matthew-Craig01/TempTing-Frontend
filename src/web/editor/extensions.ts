import { githubLight, gruvbox, vscode } from "./syntax-highlighting";
import * as c from "@codemirror/commands";
import * as v from "@codemirror/view";
import * as s from "@codemirror/state";
import * as l from "@codemirror/language";
import * as a from "@codemirror/autocomplete";
import { templateLinter } from "./linter";

export const extensions = [
  c.history(),
  v.keymap.of([...c.historyKeymap, ...c.defaultKeymap]), //Keymap
  v.gutter({}),
  v.lineNumbers(),
  v.highlightActiveLineGutter(),
  v.EditorView.lineWrapping,
  s.EditorState.tabSize.of(2),
  l.indentUnit.of("  "),
  l.indentOnInput(),
  l.bracketMatching({
    brackets: "(){}",
    afterCursor: true,
  }),
  a.closeBrackets(),
  a.autocompletion({
    activateOnTyping: true,
  }),
];
