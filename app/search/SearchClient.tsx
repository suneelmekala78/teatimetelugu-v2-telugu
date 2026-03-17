"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

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

const getUniqueItemKey = (item: any) => {
  const base = item?.newsId || item?._id || "unknown";
  const type = item?.type || "news";
  return `${type}:${base}`;
};

const dedupeItems = (items: any[]) => {
  const seen = new Set<string>();
  const unique: any[] = [];

  for (const item of items || []) {
    const key = getUniqueItemKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  return unique;
};

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
  const [hasFailed, setHasFailed] = useState(failed);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isPending, startTransition] = useTransition();
  const limit = 9;
  const hasQuery = query.trim().length > 0;
  const canSearch = query.trim().length >= 3;
  const isBusy = isSearching || isPending;

  useEffect(() => {
    setQuery(initialQuery);
    setItems(dedupeItems(initialItems || []));
    setPage(initialPagination?.currentPage || 1);
    setHasMore(initialPagination?.hasNext || false);
    setTotal(initialPagination?.totalResults || 0);
    setHasFailed(failed);
    setIsSearching(false);
  }, [initialQuery, initialItems, initialPagination, failed]);

  /* ---------------- SEARCH ---------------- */

  const handleSearch = (term: string) => {
    const clean = term.trim();

    setHasFailed(false);
    setIsSearching(true);
    setQuery(clean);
    setItems([]);
    setPage(1);
    setHasMore(false);
    setTotal(0);

    startTransition(() => {
      router.push(clean ? `/search?q=${encodeURIComponent(clean)}` : "/search");
      router.refresh();
    });
  };

  /* ---------------- LOAD MORE ---------------- */

  const handleLoadMore = async () => {
    if (!hasMore || isPending || isSearching || isLoadingMore) return;

    const nextPage = page + 1;

    try {
      setIsLoadingMore(true);
      const res: any = await api({
        url: `/news/search?query=${encodeURIComponent(query)}&page=${nextPage}&limit=${limit}&type=all`,
      });

      if (res?.status !== "success") {
        setHasFailed(true);
        return;
      }

      setItems((prev) => dedupeItems([...prev, ...(res?.results || [])]));
      setPage(nextPage);
      setHasMore(res?.pagination?.hasNext || false);
      setTotal(res?.pagination?.totalResults || total);
    } catch {
      setHasFailed(true);
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
      <SearchBar initial={query} onSearch={handleSearch} isLoading={isBusy} />

      {!hasQuery && <Suggestions />}

      {hasQuery && !canSearch && (
        <p className={`${styles.statusCard} ${styles.info}`}>
          కనీసం 3 అక్షరాలు ఇవ్వండి
        </p>
      )}

      {isBusy && canSearch && (
        <p className={`${styles.statusCard} ${styles.loading}`}>
          <span className={styles.loadingText}>
            <b className={styles.queryPill}>"{query}"</b> కోసం వెతుకుతున్నాం
            <span className={styles.loadingDots} aria-hidden="true"></span>
          </span>
        </p>
      )}

      {hasFailed && (
        <p className={`${styles.statusCard} ${styles.error}`}>
          ఫలితాలను లోడ్ చేయలేకపోయాం. మళ్లీ ప్రయత్నించండి.
        </p>
      )}

      {!isBusy && canSearch && !hasFailed && (
        <div className={styles.resultsMeta}>
          <p className={styles.resultsLabel}>
            <span className={styles.queryPill}>"{query}"</span> కోసం ఫలితాలు
          </p>
          <p className={styles.resultsCount}>
            <span className={styles.countPill}>{total}</span> దొరికాయి
          </p>
        </div>
      )}

      {items.length > 0 && <SearchGrid items={items} />}

      {hasMore && (
        <LoadMore isLoading={isLoadingMore} onLoadMore={handleLoadMore} />
      )}

      {canSearch && !hasFailed && !isBusy && items.length === 0 && (
        <NoResults text={query} />
      )}
    </>
  );
}
