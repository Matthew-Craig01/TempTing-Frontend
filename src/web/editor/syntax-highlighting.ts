import * as themes from "@uiw/codemirror-themes-all";
import { styleTags, tags as t } from "@lezer/highlight";

export const templateHighlight = styleTags({
  Role: t.className,
  Index: t.number,
  Fname: t.function(t.strong),
  Interpolation: t.constant(t.name),
  Punctuation: t.bool,
  String: t.string,
  LexemeOrString: t.string,
  Element: t.brace,
  Slot: t.keyword,
  DependencyLabel: t.keyword,
  Label: t.keyword,
  Function: t.keyword,
  Args: t.keyword,
});

export const gruvbox = themes.gruvboxDarkInit({
  styles: [{ tag: t.string, color: "#b8bb26" }],
  settings: { fontSize: 80 },
});

export const vscode = themes.vscodeDarkInit({ styles: [] });

export const vscodeLight = themes.vscodeLightInit({
  styles: [],
  settings: { fontSize: 80 },
});

export const githubLight = (fontSize: number) => {
  return themes.githubLightInit({
    styles: [],
    settings: { fontSize: fontSize + "em" },
  });
};

export const githubDark = (fontSize: number) => {
  return themes.githubDarkInit({
    styles: [],
    settings: {
      fontSize: fontSize + "em",
      background: "black", // "240 10% 3.9%"
      gutterBackground: "black",
    },
  });
};
