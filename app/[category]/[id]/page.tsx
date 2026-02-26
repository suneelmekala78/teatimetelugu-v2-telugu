import { getSingleNews } from "@/lib/requests-server";
import NewsView from "./NewsView";
import HydrateReactions from "@/components/providers/HydrateReactions";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    category: string;
    id: string;
  }>;
};

/* ========= SEO ========= */
export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  try {
    const res = await getSingleNews(id);

    if (res?.status === "success") {
      return {
        title: res.news?.title?.te,
        description: res.news?.description?.te?.text,
        openGraph: {
          images: [res.news?.mainUrl],
        },
      };
    }
  } catch {}

  return { title: "టీ టైం తెలుగు" };
}

/* ========= PAGE ========= */
export default async function Page({ params }: Props) {
  const { id } = await params;

  let news = null;
  let suggested = [];

  try {
    const res = await getSingleNews(id);

    if (res?.status === "success") {
      news = res.news;
      suggested = res.suggestedNews || [];
    }
  } catch {}

  if (!news) notFound();

  return (
    <HydrateReactions reactions={news.reactions || []}>
      <NewsView news={news} suggested={suggested} />
    </HydrateReactions>
  );
}
