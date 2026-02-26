import styles from "./HomeLoading.module.css";

export default function Loading() {
  return (
    <main className={styles.wrapper}>
      {/* ================= TOP NEWS GRID ================= */}
      <section className={styles.topGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.newsCard}>
            <div className={`${styles.thumb} ${styles.skeleton}`} />
            <div className={styles.newsText}>
              <div className={`${styles.lineMd} ${styles.skeleton}`} />
              <div className={`${styles.lineSm} ${styles.skeleton}`} />
            </div>
          </div>
        ))}
      </section>

      {/* ================= FEATURED + LIST + SLIDER ================= */}
      <section className={styles.featureRow}>
        {/* LEFT BIG */}
        <div className={styles.featureLeft}>
          <div className={`${styles.bigImage} ${styles.skeleton}`} />
          <div className={`${styles.lineLg} ${styles.skeleton}`} />
          <div className={`${styles.lineSm} ${styles.skeleton}`} />
        </div>

        {/* MIDDLE LIST */}
        <div className={styles.featureMiddle}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.sideItem}>
              <div className={`${styles.sideThumb} ${styles.skeleton}`} />
              <div className={styles.sideText}>
                <div className={`${styles.lineMd} ${styles.skeleton}`} />
                <div className={`${styles.lineSm} ${styles.skeleton}`} />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SLIDER */}
        <div className={styles.featureRight}>
          <div className={`${styles.slider} ${styles.skeleton}`} />
          <div className={styles.dots}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`${styles.dot} ${styles.skeleton}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODELS / GALLERY ================= */}
      <section className={styles.galleryRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.galleryCard}>
            <div className={`${styles.galleryImg} ${styles.skeleton}`} />
            <div className={`${styles.galleryTag} ${styles.skeleton}`} />
            <div className={`${styles.lineSm} ${styles.skeleton}`} />
          </div>
        ))}
      </section>
    </main>
  );
}
