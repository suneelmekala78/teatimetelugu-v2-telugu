import { getSearchNews } from "@/lib/requests-server";
import TabTitle from "@/components/common/titles/TabTitle";
import styles from "./page.module.css";
import SearchClient from "./SearchClient";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let initialItems: any[] = [];
  let initialPagination: any = {};
  let failed = false;

  if (query.length >= 3) {
    try {
      const res = await getSearchNews(query, 1); // only page 1
      initialItems = res?.results || [];
      initialPagination = res?.pagination || {};
    } catch {
      failed = true;
    }
  }

  return (
    <main className={styles.container}>
      <TabTitle title="శోధించండి" />

      <SearchClient
        initialQuery={query}
        initialItems={initialItems}
        initialPagination={initialPagination}
        failed={failed}
      />
    </main>
  );
}
