"use client";

import { useRouter } from "next/navigation";
import styles from "./Suggestions.module.css";

const tags = ["క్రికెట్", "మూవీస్", "పాలిటిక్స్", "టెక్", "హైదరాబాద్"];

export default function Suggestions() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>పాపులర్ సెర్చ్‌లు</p>
      <div className={styles.tags}>
        {tags.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => router.push(`/search?q=${encodeURIComponent(t)}`)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
