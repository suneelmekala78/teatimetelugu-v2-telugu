import { getNewsComments } from "@/lib/requests-server";
import CommentsClient from "./CommentsClient";

interface Props {
  newsId: string;
}

export default async function CommentsServer({ newsId }: Props) {
  let comments: any[] = [];

  try {
    const res = await getNewsComments(newsId);

    if (res?.status === "success") {
      comments = res.data.comments || [];
    }
  } catch (e) {
    console.error("Failed to fetch comments", e);
  }

  return <CommentsClient newsId={newsId} initialComments={comments} />;
}
