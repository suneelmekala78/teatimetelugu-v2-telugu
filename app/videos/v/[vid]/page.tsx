import { getVideo } from "@/lib/requests-server";
import VideoView from "./VideoView";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ vid: string }>;
};

/* ========= SEO ========= */
export async function generateMetadata({ params }: Props) {
  const { vid } = await params;

  try {
    const res = await getVideo(vid);

    if (res?.status === "success") {
      return {
        title: res.video?.title?.te,
        description: res.video?.title?.te,
        openGraph: {
          images: [res.video?.mainUrl],
        },
      };
    }
  } catch {}

  return { title: "టీ టైం తెలుగు" };
}

/* ========= PAGE ========= */
export default async function Page({ params }: Props) {
  const { vid } = await params;

  const res = await getVideo(vid);

  if (!res?.status) {
    notFound();
  }

  return (
    <VideoView
      video={res.video}
      suggested={res.suggestedVideos || []}
      similar={res.similarVideos || []}
    />
  );
}
