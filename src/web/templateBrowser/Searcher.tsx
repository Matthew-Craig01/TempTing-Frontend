import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Language } from "@web/Template";
import { LanguageSelector } from "@web/templateCreator/LanguageSelector";
import { Component } from "react";
import { useNavigate } from "react-router-dom";

const Searcher = ({
  newSearch,
  setNewSearch,
  selectedLang,
  setSelectedLang,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col justify-end gap-2 p-5 sm:flex-row">
      <div className="sm:min-w-64 sm:max-w-80">
        <LanguageSelector
          onSelect={(current) => {
            setSelectedLang(current as Language);
          }}
          lState={selectedLang}
        />
      </div>
      <Input
        value={newSearch}
        onChange={(e) => {
          setNewSearch(e.target.value);
        }}
        className="sm:max-w-80"
        type="search"
        placeholder="Search"
      />
      <Button
        type="submit"
        onClick={() =>
          navigate(`/browse/search/${newSearch}/lang/${selectedLang}/${1}`)
        }
      >
        Search
      </Button>
      <Button
        onClick={() => navigate("/browse")}
        variant="outline"
        type="submit"
      >
        Reset
      </Button>
    </div>
  );
};

export default Searcher;
