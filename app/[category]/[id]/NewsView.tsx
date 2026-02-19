import Image from "next/image";
import styles from "./NewsView.module.css";
import Reactions from "@/components/news/reactions/Reactions";
import { FaCalendarAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaShareNodes,
} from "react-icons/fa6";

import LatestStories from "@/components/common/lateststories/LatestStories";
import ReadButton from "@/components/news/readbutton/ReadButton";
import Social from "@/components/news/social/Social";
import Tags from "@/components/news/tags/Tags";
import SuggestedNews from "@/components/news/suggestednews/SuggestedNews";
import CommentsServer from "@/components/news/comments/CommentsServer";
import NewsShare from "@/components/common/share/NewsShare";

type Props = {
  news: any;
  suggested: any[];
};

export default function NewsView({ news, suggested }: Props) {
  const date = new Date(news.createdAt);

  const time = new Intl.DateTimeFormat("te-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  const dayDate = new Intl.DateTimeFormat("te-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const formattedDate = `${time.toUpperCase()}, ${dayDate}`;

  return (
    <main className={styles.wrapper}>
      {/* ========= LEFT ========= */}
      <div className={styles.left}>
        <h1 className={styles.title}>{news?.title?.te}</h1>

        <div className={styles.metaflex}>
          <div className={styles.meta}>
            <span>
              <FaCalendarAlt />
              {formattedDate}
            </span>
            {news?.newsAudio?.te && <ReadButton news={news} />}
          </div>

          <NewsShare title={news?.title?.te} />
        </div>

        <div className={styles.imageWrap}>
          <Image
            src={news?.mainUrl}
            alt={news?.title?.te}
            fill
            sizes="800px"
            className={styles.image}
          />
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: news?.description?.te?.withTags,
          }}
        />

        <Reactions newsId={news._id} isGallery={false} />
        <CommentsServer newsId={news._id} />
        <SuggestedNews items={suggested} />
      </div>

      {/* ========= RIGHT ========= */}
      <aside className={styles.right}>
        <Tags tags={news?.tags} />
        <Social />
        <LatestStories />
      </aside>
    </main>
  );
}
