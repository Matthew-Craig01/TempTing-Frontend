import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Component, FC } from "react";

const Paginator: FC<{ search: string; language: string; pg: number }> = ({
  search,
  language,
  pg,
}) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        {pg > 1 ? (
          <PaginationPrevious
            href={`/browse/search/${search}/lang/${language}/${pg - 1}`}
          />
        ) : (
          <></>
        )}
      </PaginationItem>
      {pg > 2 ? (
        <PaginationItem>
          <PaginationLink
            href={`/browse/search/${search}/lang/${language}/${pg - 2}`}
          >
            {pg - 2}
          </PaginationLink>
        </PaginationItem>
      ) : (
        <></>
      )}
      {pg > 1 ? (
        <PaginationItem>
          <PaginationLink
            href={`/browse/search/${search}/lang/${language}/${pg - 1}`}
          >
            {pg - 1}
          </PaginationLink>
        </PaginationItem>
      ) : (
        <></>
      )}
      <PaginationItem className="outline outline-1">
        <PaginationLink
          href={`/browse/search/${search}/lang/${language}/${pg}`}
        >
          {pg}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href={`/browse/search/${search}/lang/${language}/${pg + 1}`}
        >
          {pg + 1}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href={`/browse/search/${search}/lang/${language}/${pg + 2}`}
        >
          {pg + 2}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext
          href={`/browse/search/${search}/lang/${language}/${pg + 1}`}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export default Paginator;
