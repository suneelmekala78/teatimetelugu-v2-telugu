import styles from "./Gallery.module.css";

const SKELETON_COUNT = 12;

export default function Loading() {
  return (
    <main className={styles.container}>
      {/* ===== TITLE ===== */}
      <div className={styles.titleSkeleton} />

      {/* ===== TABS ===== */}
      {/* <div className={styles.categories}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.tabSkeleton} ${styles.skeleton}`} />
        ))}
      </div> */}

      {/* ===== GRID ===== */}
      <div className={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className={`${styles.card} ${styles.skeleton}`}>
            <div className={styles.imageFake} />
            <div className={styles.nameSkeleton} />
          </div>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      <div className={styles.pagination}>
        <div className={`${styles.pageBtn} ${styles.skeleton}`} />
        <div className={`${styles.pageText} ${styles.skeleton}`} />
        <div className={`${styles.pageBtn} ${styles.skeleton}`} />
      </div>
    </main>
  );
}
