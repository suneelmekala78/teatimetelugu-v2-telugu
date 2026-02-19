"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getSearchNews } from "@/lib/requests-server";

import styles from "./page.module.css";
import Suggestions from "@/components/search/Suggestions";
import SearchBar from "@/components/search/SearchBar";
import SearchGrid from "@/components/search/SearchGrid";
import LoadMore from "@/components/common/loadmore/LoadMore";
import NoResults from "@/components/search/NoResults";

interface Props {
  initialQuery: string;
  initialItems: any[];
  initialPagination: any;
  failed: boolean;
}

export default function SearchClient({
  initialQuery,
  initialItems,
  initialPagination,
  failed,
}: Props) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(initialPagination?.currentPage || 1);
  const [hasMore, setHasMore] = useState(initialPagination?.hasNext || false);
  const [total, setTotal] = useState(initialPagination?.totalResults || 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isPending, startTransition] = useTransition();
  const limit = 9;

  /* ---------------- SEARCH ---------------- */

  const handleSearch = (term: string) => {
    const clean = term.trim();

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(clean)}`);
    });
  };

  /* ---------------- LOAD MORE ---------------- */

  const handleLoadMore = async () => {
    if (!hasMore || isPending) return;

    const nextPage = page + 1;

    try {
      setIsLoadingMore(true);
      const res = await getSearchNews(query, nextPage, limit);

      setItems((prev) => [...prev, ...(res?.results || [])]);
      setPage(nextPage);
      setHasMore(res?.pagination?.hasNext || false);
    } catch {
      console.error("Pagination failed");
    } finally {
      setIsLoadingMore(false);
    }
  };

  /* ---------------- UI ---------------- */

  // if (!query) return <Suggestions />;

  // if (failed) return <p>Something went wrong</p>;

  // if (query.length < 3)
  //   return <p className={styles.info}>Enter minimum 3 letters</p>;

  return (
    <>
      <SearchBar initial={query} onSearch={handleSearch} />

      {!query && <Suggestions />}

      {query.length > 0 && query.length < 3 && (
        <p className={styles.info}>Enter minimum 3 letters</p>
      )}

      {failed && <p>Something went wrong</p>}

      {items.length > 0 && <SearchGrid items={items} />}

      {hasMore && (
        <LoadMore isLoading={isLoadingMore} onLoadMore={handleLoadMore} />
      )}

      {total > 0 && (
        <div className={styles.totalCard}>
          <p className={styles.totalCount}>
            మొత్తం {total} ఫలితాలు కనుగొనబడ్డాయి
          </p>
        </div>
      )}

      {query.length >= 3 && !failed && items.length === 0 && (
        <NoResults text={query} />
      )}
    </>
  );
}
