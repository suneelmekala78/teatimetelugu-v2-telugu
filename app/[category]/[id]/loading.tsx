import styles from "./NewsView.module.css";

export default function Loading() {
  return (
    <main className={styles.wrapper}>
      {/* ===== LEFT CONTENT ===== */}
      <div className={styles.left}>
        {/* Title */}
        <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />

        {/* Meta */}
        <div className={styles.meta}>
          <div className={`${styles.metaSkeleton} ${styles.skeleton}`} />
        </div>

        {/* Image */}
        <div className={`${styles.imageWrap} ${styles.skeleton}`} />

        {/* Paragraphs */}
        <div className={styles.content}>
          <div className={`${styles.line} ${styles.skeleton}`} />
          <div className={`${styles.line} ${styles.skeleton}`} />
          <div className={`${styles.line} ${styles.skeleton}`} />
          <div className={`${styles.lineShort} ${styles.skeleton}`} />
        </div>
      </div>

      {/* ===== RIGHT SIDEBAR ===== */}
      <aside className={styles.right}>
        {/* Tags */}
        <div className={styles.sideBlock}>
          <div className={`${styles.sideTitleSkeleton} ${styles.skeleton}`} />
          <div className={styles.tagWrap}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`${styles.tagSkeleton} ${styles.skeleton}`} />
            ))}
          </div>
        </div>

        {/* Follow Us */}
        <div className={styles.sideBlock}>
          <div className={`${styles.sideTitleSkeleton} ${styles.skeleton}`} />
          <div className={styles.socialWrap}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${styles.socialSkeleton} ${styles.skeleton}`} />
            ))}
          </div>
        </div>

        {/* Latest Stories */}
        <div className={styles.sideBlock}>
          <div className={`${styles.sideTitleSkeleton} ${styles.skeleton}`} />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.latestItem}>
              <div className={`${styles.latestImg} ${styles.skeleton}`} />
              <div className={`${styles.latestText} ${styles.skeleton}`} />
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}
