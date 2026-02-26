import styles from "./Videos.module.css";

const SKELETON_COUNT = 8;

export default function Loading() {
  return (
    <div className={styles.container}>
      {/* GRID SKELETON */}
      <div className={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className={`${styles.card} ${styles.shadow}`}>
            <div className={`${styles.imageWrap} ${styles.skeleton}`} />

            <div className={styles.texts}>
              <div className={`${styles.metaSkeleton} ${styles.skeleton}`} />
              <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />
              <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION SKELETON */}
      <div className={styles.pagination}>
        <div className={`${styles.pageBtn} ${styles.skeleton}`} />
        <div className={`${styles.pageText} ${styles.skeleton}`} />
        <div className={`${styles.pageBtn} ${styles.skeleton}`} />
      </div>
    </div>
  );
}
