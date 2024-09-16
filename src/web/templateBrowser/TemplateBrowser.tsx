import { Language, Template } from "@web/Template";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { User, useUser } from "@web/user/UserProvider";
import { useNavigate, useParams } from "react-router-dom";
import { TemplateCard } from "./TemplateCard";
import ErrorPage from "@web/ErrorPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TemplateLanguage, {
  LanguageSelector,
} from "@web/templateCreator/LanguageSelector";
import { TemplateContext } from "@web/templateCreator/TemplateProvider";
import Paginator from "./Paginator";
import { Plus } from "lucide-react";
import Searcher from "./Searcher";

export type BrowseTemplate = {
  template: Template;
  creator: User;
};

const TemplateBrowser = ({ mine }) => {
  const {
    search = "",
    language = "all" as Language,
    page = "1",
    publishedId = null,
  } = useParams();
  const [templates, setTemplates] = useState<BrowseTemplate[] | null>(null);
  const [drafts, setDrafts] = useState<Template[] | null>(null);
  const [showDrafts, setShowDrafts] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState(language as Language);
  const [newSearch, setNewSearch] = useState(search);
  const navigate = useNavigate();
  const showSearch = publishedId === null && mine !== true;
  const { user } = useUser();

  let pg = 1;
  pg = Number.parseInt(page);

  useEffect(() => {
    if (publishedId === null && !mine) {
      getTemplates(
        setTemplates,
        setNetworkError,
        pg,
        language as Language,
        search,
      );
    } else if (!mine) {
      getVariants(
        setTemplates,
        setNetworkError,
        Number.parseInt(publishedId),
        pg,
      );
    } else {
      if (user === null) {
        navigate("/signin");
      } else {
        getMine(setTemplates, setDrafts, setNetworkError, user, pg);
      }
    }
  }, [search, language, page]);

  if (networkError) {
    return (
      <ErrorPage title="Network Error" description="Try refresh the page" />
    );
  }

  const skeletons = Array(30)
    .fill(null)
    .map((_, index) => <SkeletonCard key={index} />);

  let cards;
  if (templates === null) {
    cards = skeletons;
  } else if (templates.length === 0) {
    return (
      <ErrorPage
        title="No templates match your search."
        description="Try using a less specific search, navigate to a previous page, or create a template."
      >
        <div className="flex justify-center p-10">
          <Button
            onClick={() => navigate("/browse")}
            variant="outline"
            type="submit"
          >
            Reset
          </Button>
        </div>
      </ErrorPage>
    );
  } else if (showDrafts) {
    cards = drafts.map((template, index) => (
      <div key={index}>
        <TemplateCard template={{ template, creator: user }} />
      </div>
    ));
  } else {
    cards = templates.map((template, index) => (
      <div key={index}>
        <TemplateCard template={template} />
      </div>
    ));
  }

  return (
    <div className="h-full max-h-full">
      {mine ? (
        <div className="flex justify-center gap-5">
          <Button
            onClick={() => setShowDrafts(true)}
            variant={showDrafts ? "default" : "outline"}
          >
            Drafts
          </Button>
          <Button
            onClick={() => setShowDrafts(false)}
            variant={!showDrafts ? "default" : "outline"}
          >
            Published
          </Button>
        </div>
      ) : (
        <></>
      )}
      {showSearch ? (
        <Searcher
          newSearch={newSearch}
          setNewSearch={setNewSearch}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
        />
      ) : (
        <></>
      )}
      <div className="flex h-full max-h-full justify-center overflow-scroll sm:p-10">
        <div className="flex h-full max-h-full flex-wrap justify-center gap-5">
          {cards}
          <div className="w-full p-24"></div>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full justify-center bg-background py-5">
        <Paginator search={search} language={language} pg={pg} />
      </div>
      <a href="/create">
        <Button
          size="icon"
          className="center fixed bottom-16 right-1/2 rounded sm:bottom-14 sm:right-14"
        >
          <Plus />
        </Button>
      </a>
    </div>
  );
};

const getTemplates = async (
  setTemplates: (templates: BrowseTemplate[]) => void,
  setNetworkError: (networkError: boolean) => void,
  page: number,
  language: Language,
  search: String,
) => {
  const apiPath = "/api/browse";

  const toSubmit = {
    page: page,
    language: language,
    search: search,
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
    const json: BrowseTemplate[] = await response.json();
    if (response.ok) {
      setTemplates(json);
    } else {
      setNetworkError(true);
    }
  } catch (error) {
    console.log(error);
  }
};

const getVariants = async (
  setTemplates: (templates: BrowseTemplate[]) => void,
  setNetworkError: (networkError: boolean) => void,
  publishedId: number,
  page: number,
) => {
  const apiPath = "/api/variants";

  const toSubmit = {
    page: page,
    publishedId: publishedId,
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
    const json: BrowseTemplate[] = await response.json();
    if (response.ok) {
      setTemplates(json);
    } else {
      setNetworkError(true);
    }
  } catch (error) {
    console.log(error);
  }
};

const getMine = async (
  setTemplates: (templates: BrowseTemplate[]) => void,
  setDrafts: (templates: Template[]) => void,
  setNetworkError: (networkError: boolean) => void,
  username: string,
  page: number,
) => {
  const apiPath = "/api/mine";

  const toSubmit = {
    page: page,
    username: username,
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
    const json: { drafts: Template[]; published: BrowseTemplate[] } =
      await response.json();
    if (response.ok) {
      const { drafts, published } = json;
      setTemplates(published);
      setDrafts(drafts);
    } else {
      setNetworkError(true);
    }
  } catch (error) {
    console.log(error);
  }
};
export default TemplateBrowser;
