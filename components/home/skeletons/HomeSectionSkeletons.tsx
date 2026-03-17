import styles from "./Skeletons.module.css";

const S = `${styles.skeleton}`;

export function BreakingNewsSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={styles.breakingRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.breakingCard} ${S}`} />
        ))}
      </div>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.newsGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.newsCard}>
            <div className={`${styles.newsImage} ${S}`} />
            <div className={`${styles.newsLine} ${S}`} />
            <div className={`${styles.newsLineShort} ${S}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendingSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.trendingGrid}>
        <div className={`${styles.trendingBig} ${S}`} />
        <div className={styles.trendingList}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.trendingItem}>
              <div className={`${styles.trendingThumb} ${S}`} />
              <div className={`${styles.trendingText} ${S}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScrollSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.breakingRow}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.breakingCard} ${S}`} />
        ))}
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.galleryGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.galleryCard} ${S}`} />
        ))}
      </div>
    </div>
  );
}

export function MostViewedSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.mvGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.mvCard} ${S}`} />
        ))}
      </div>
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.reviewsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`${styles.reviewCard} ${S}`} />
        ))}
      </div>
    </div>
  );
}

export function CategoryTopSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.catSection}>
          <div className={`${styles.catTitle} ${S}`} />
          <div className={styles.catGrid}>
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className={styles.catCard}>
                <div className={`${styles.catThumb} ${S}`} />
                <div className={styles.catText}>
                  <div className={`${styles.catLine} ${S}`} />
                  <div className={`${styles.catLine} ${S}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function VideoGallerySkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.videoSection}>
        <div className={`${styles.videoPlayer} ${S}`} />
        <div className={styles.videoList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.videoItem}>
              <div className={`${styles.videoThumb} ${S}`} />
              <div className={`${styles.videoText} ${S}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MoreStoriesSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.newsGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.newsCard}>
            <div className={`${styles.newsImage} ${S}`} />
            <div className={`${styles.newsLine} ${S}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OtherPostsSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={styles.catGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.catCard}>
            <div className={`${styles.catThumb} ${S}`} />
            <div className={styles.catText}>
              <div className={`${styles.catLine} ${S}`} />
              <div className={`${styles.catLine} ${S}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MovieTableSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={`${styles.titleBar} ${S}`} />
      <div className={`${styles.movieTable} ${S}`} />
    </div>
  );
}
