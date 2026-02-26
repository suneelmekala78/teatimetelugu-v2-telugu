"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  lazy?: boolean;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function SmartAdUnit({
  slot,
  format = "auto",
  style,
  lazy = true,
}: Props) {
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ MUST be HTMLModElement (because <ins> is typed like that)
  const insRef = useRef<HTMLModElement | null>(null);

  const [shouldRender, setShouldRender] = useState(!lazy);

  /* ---------------- Lazy Load ---------------- */
  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  /* ---------------- Refresh On Route Change ---------------- */
  useEffect(() => {
    if (!shouldRender || !insRef.current) return;

    // Clear previous ad (important for Next.js SPA)
    insRef.current.innerHTML = "";

    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.debug("AdSense push skipped:", err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname, shouldRender]);

  return (
    <div ref={containerRef}>
      {shouldRender && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", ...style }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
