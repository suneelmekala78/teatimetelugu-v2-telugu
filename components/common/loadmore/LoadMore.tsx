"use client";

import styles from "./LoadMore.module.css";
import { FaArrowRotateRight } from "react-icons/fa6";

interface Props {
  onLoadMore: () => void;
  isLoading?: boolean;
}

export default function LoadMore({ onLoadMore, isLoading = false }: Props) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={styles.text}>లోడ్ అవుతోంది...</span>
            <span className={styles.spinner}></span>
          </>
        ) : (
          <>
            <span className={styles.text}>మరిన్ని లోడ్ చేయండి</span>
            <span className={styles.icon}>
              <FaArrowRotateRight />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
