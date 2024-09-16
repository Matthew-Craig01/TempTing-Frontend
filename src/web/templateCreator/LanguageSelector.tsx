import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Component, FC, useContext, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Language } from "@web/Template";
import { TemplateContext, TemplateErrorContext } from "./TemplateProvider";

const languages: {
  value: Language;
  label: string;
}[] = [
  {
    value: "abaza",
    label: "Abaza",
  },
  {
    value: "abkhaz",
    label: "Abkhaz",
  },
  {
    value: "afrikaans",
    label: "Afrikaans",
  },
  {
    value: "akkadian",
    label: "Akkadian",
  },
  {
    value: "akuntsu",
    label: "Akuntsu",
  },
  {
    value: "albanian",
    label: "Albanian",
  },
  {
    value: "amharic",
    label: "Amharic",
  },
  {
    value: "ancientGreek",
    label: "Ancient Greek",
  },
  {
    value: "ancientHebrew",
    label: "Ancient Hebrew",
  },
  {
    value: "apurina",
    label: "Apurina",
  },
  {
    value: "arabic",
    label: "Arabic",
  },
  {
    value: "armenian",
    label: "Armenian",
  },
  {
    value: "assyrian",
    label: "Assyrian",
  },
  {
    value: "azerbaijani",
    label: "Azerbaijani",
  },
  {
    value: "bambara",
    label: "Bambara",
  },
  {
    value: "basque",
    label: "Basque",
  },
  {
    value: "bavarian",
    label: "Bavarian",
  },
  {
    value: "beja",
    label: "Beja",
  },
  {
    value: "belarusian",
    label: "Belarusian",
  },
  {
    value: "bengali",
    label: "Bengali",
  },
  {
    value: "bhojpuri",
    label: "Bhojpuri",
  },
  {
    value: "bororo",
    label: "Bororo",
  },
  {
    value: "breton",
    label: "Breton",
  },
  {
    value: "bulgarian",
    label: "Bulgarian",
  },
  {
    value: "buryat",
    label: "Buryat",
  },
  {
    value: "cantonese",
    label: "Cantonese",
  },
  {
    value: "cappadocian",
    label: "Cappadocian",
  },
  {
    value: "catalan",
    label: "Catalan",
  },
  {
    value: "cebuano",
    label: "Cebuano",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
  {
    value: "chukchi",
    label: "Chukchi",
  },
  {
    value: "classicalArmenian",
    label: "Classical Armenian",
  },
  {
    value: "classicalChinese",
    label: "Classical Chinese",
  },
  {
    value: "coptic",
    label: "Coptic",
  },
  {
    value: "croatian",
    label: "Croatian",
  },
  {
    value: "czech",
    label: "Czech",
  },
  {
    value: "danish",
    label: "Danish",
  },
  {
    value: "dutch",
    label: "Dutch",
  },
  {
    value: "egyptian",
    label: "Egyptian",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "erzya",
    label: "Erzya",
  },
  {
    value: "estonian",
    label: "Estonian",
  },
  {
    value: "faroese",
    label: "Faroese",
  },
  {
    value: "finnish",
    label: "Finnish",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "frisianDutch",
    label: "Frisian Dutch",
  },
  {
    value: "galician",
    label: "Galician",
  },
  {
    value: "georgian",
    label: "Georgian",
  },
  {
    value: "german",
    label: "German",
  },
  {
    value: "gheg",
    label: "Gheg",
  },
  {
    value: "gothic",
    label: "Gothic",
  },
  {
    value: "greek",
    label: "Greek",
  },
  {
    value: "guajajara",
    label: "Guajajara",
  },
  {
    value: "guarani",
    label: "Guarani",
  },
  {
    value: "gujarati",
    label: "Gujarati",
  },
  {
    value: "haitianCreole",
    label: "Haitian Creole",
  },
  {
    value: "hausa",
    label: "Hausa",
  },
  {
    value: "hebrew",
    label: "Hebrew",
  },
  {
    value: "highlandPueblaNahuatl",
    label: "Highland P. Nahuatl",
  },
  {
    value: "hindi",
    label: "Hindi",
  },
  {
    value: "hittite",
    label: "Hittite",
  },
  {
    value: "hungarian",
    label: "Hungarian",
  },
  {
    value: "icelandic",
    label: "Icelandic",
  },
  {
    value: "indonesian",
    label: "Indonesian",
  },
  {
    value: "irish",
    label: "Irish",
  },
  {
    value: "italian",
    label: "Italian",
  },
  {
    value: "japanese",
    label: "Japanese",
  },
  {
    value: "javanese",
    label: "Javanese",
  },
  {
    value: "kaapor",
    label: "Kaapor",
  },
  {
    value: "kangri",
    label: "Kangri",
  },
  {
    value: "karelian",
    label: "Karelian",
  },
  {
    value: "karo",
    label: "Karo",
  },
  {
    value: "kazakh",
    label: "Kazakh",
  },
  {
    value: "khunsari",
    label: "Khunsari",
  },
  {
    value: "kiche",
    label: "Kiche",
  },
  {
    value: "komiPermyak",
    label: "Komi Permyak",
  },
  {
    value: "komiZyrian",
    label: "KomiZyrian",
  },
  {
    value: "korean",
    label: "Korean",
  },
  {
    value: "kurmanji",
    label: "Kurmanji",
  },
  {
    value: "kyrgyz",
    label: "Kyrgyz",
  },
  {
    value: "latgalian",
    label: "Latgalian",
  },
  {
    value: "latin",
    label: "Latin",
  },
  {
    value: "latvian",
    label: "Latvian",
  },
  {
    value: "ligurian",
    label: "Ligurian",
  },
  {
    value: "lithuanian",
    label: "Lithuanian",
  },
  {
    value: "livvi",
    label: "Livvi",
  },
  {
    value: "lowSaxon",
    label: "LowSaxon",
  },
  {
    value: "luxembourgish",
    label: "Luxembourgish",
  },
  {
    value: "macedonian",
    label: "Macedonian",
  },
  {
    value: "madi",
    label: "Madi",
  },
  {
    value: "maghrebiArabicFrench",
    label: "Maghrebi Arabic French",
  },
  {
    value: "makurap",
    label: "Makurap",
  },
  {
    value: "malayalam",
    label: "Malayalam",
  },
  {
    value: "maltese",
    label: "Maltese",
  },
  {
    value: "manx",
    label: "Manx",
  },
  {
    value: "marathi",
    label: "Marathi",
  },
  {
    value: "mbyaGuarani",
    label: "Mbya Guarani",
  },
  {
    value: "middleFrench",
    label: "Middle French",
  },
  {
    value: "moksha",
    label: "Moksha",
  },
  {
    value: "munduruku",
    label: "Munduruku",
  },
  {
    value: "naija",
    label: "Naija",
  },
  {
    value: "nayini",
    label: "Nayini",
  },
  {
    value: "neapolitan",
    label: "Neapolitan",
  },
  {
    value: "nheengatu",
    label: "Nheengatu",
  },
  {
    value: "northSami",
    label: "North Sami",
  },
  {
    value: "norwegian",
    label: "Norwegian",
  },
  {
    value: "oldChurchSlavonic",
    label: "Old Church Slavonic",
  },
  {
    value: "oldEastSlavic",
    label: "Old East Slavic",
  },
  {
    value: "oldFrench",
    label: "Old French",
  },
  {
    value: "oldIrish",
    label: "OldIrish",
  },
  {
    value: "oldTurkish",
    label: "OldTurkish",
  },
  {
    value: "ottomanTurkish",
    label: "OttomanTurkish",
  },
  {
    value: "paumari",
    label: "Paumari",
  },
  {
    value: "persian",
    label: "Persian",
  },
  {
    value: "polish",
    label: "Polish",
  },
  {
    value: "pomak",
    label: "Pomak",
  },
  {
    value: "portuguese",
    label: "Portuguese",
  },
  {
    value: "romanian",
    label: "Romanian",
  },
  {
    value: "russian",
    label: "Russian",
  },
  {
    value: "sanskrit",
    label: "Sanskrit",
  },
  {
    value: "scottishGaelic",
    label: "Scottish Gaelic",
  },
  {
    value: "serbian",
    label: "Serbian",
  },
  {
    value: "sinhala",
    label: "Sinhala",
  },
  {
    value: "skoltSami",
    label: "Skolt Sami",
  },
  {
    value: "slovak",
    label: "Slovak",
  },
  {
    value: "slovenian",
    label: "Slovenian",
  },
  {
    value: "soi",
    label: "Soi",
  },
  {
    value: "southLevantineArabic",
    label: "South Levantine Arabic",
  },
  {
    value: "spanish",
    label: "Spanish",
  },
  {
    value: "swedish",
    label: "Swedish",
  },
  {
    value: "swedishSignLanguage",
    label: "Swedish Sign Language",
  },
  {
    value: "swissGerman",
    label: "Swiss German",
  },
  {
    value: "tagalog",
    label: "Tagalog",
  },
  {
    value: "tamil",
    label: "Tamil",
  },
  {
    value: "tatar",
    label: "Tatar",
  },
  {
    value: "teko",
    label: "Teko",
  },
  {
    value: "telugu",
    label: "Telugu",
  },
  {
    value: "teluguEnglish",
    label: "Telugu English",
  },
  {
    value: "thai",
    label: "Thai",
  },
  {
    value: "tswana",
    label: "Tswana",
  },
  {
    value: "tupinamba",
    label: "Tupinamba",
  },
  {
    value: "turkish",
    label: "Turkish",
  },
  {
    value: "turkishGerman",
    label: "Turkish German",
  },
  {
    value: "ukrainian",
    label: "Ukrainian",
  },
  {
    value: "umbrian",
    label: "Umbrian",
  },
  {
    value: "upperSorbian",
    label: "Upper Sorbian",
  },
  {
    value: "urdu",
    label: "Urdu",
  },
  {
    value: "uyghur",
    label: "Uyghur",
  },
  {
    value: "veps",
    label: "Veps",
  },
  {
    value: "vietnamese",
    label: "Vietnamese",
  },
  {
    value: "warlpiri",
    label: "Warlpiri",
  },
  {
    value: "welsh",
    label: "Welsh",
  },
  {
    value: "westernArmenian",
    label: "Western Armenian",
  },
  {
    value: "westernSierraPueblaNahuatl",
    label: "Western Sierra Puebla Nahuatl",
  },
  {
    value: "wolof",
    label: "Wolof",
  },
  {
    value: "xavante",
    label: "Xavante",
  },
  {
    value: "xibe",
    label: "Xibe",
  },
  {
    value: "yakut",
    label: "Yakut",
  },
  {
    value: "yoruba",
    label: "Yoruba",
  },
  {
    value: "yupik",
    label: "Yupik",
  },
  {
    value: "zaar",
    label: "Zaar",
  },
];

const TemplateLanguage: FC<{ locked?: boolean }> = ({ locked }) => {
  const { template, setTemplate } = useContext(TemplateContext);
  const { errors, setErrors } = useContext(TemplateErrorContext);

  const onSelect = (currentValue: string) => {
    setErrors({ ...errors, language: false });
    setTemplate({
      ...template,
      language: currentValue as Language,
    });
  };

  useEffect(() => {
    if (template.language !== null) {
      onSelect(template.language);
    }
  }, []);

  return (
    <div className="flex grow flex-col gap-1.5 p-2 sm:p-0">
      <Label className="flex justify-center text-lg font-semibold sm:block">
        <p className="md:w-1/2 lg:w-full">Template Language</p>
      </Label>
      {!locked ? (
        <LanguageSelector onSelect={onSelect} lState={template.language} />
      ) : (
        <div className="border-1 flex h-full flex-col justify-center border border-muted px-2 text-muted-foreground">
          {template.language}
        </div>
      )}
    </div>
  );
};

export const LanguageSelector: FC<{
  onSelect: (current: string) => void;
  lState: Language | null;
}> = ({ onSelect, lState }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {lState !== null && lState !== "all"
            ? languages.find((language) => language.value === lState)?.label
            : "Select Language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Language..." />
          <CommandList>
            <CommandEmpty>No Language Found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      lState === language.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TemplateLanguage;
