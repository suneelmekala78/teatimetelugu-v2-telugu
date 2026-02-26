let pushedAds = new WeakSet<Element>();

export function pushAd(el: Element) {
  if (typeof window === "undefined") return;

  // prevent duplicate push on same DOM node
  if (pushedAds.has(el)) return;

  try {
    // ensure script loaded
    if (!(window as any).adsbygoogle) return;

    (window as any).adsbygoogle.push({});
    pushedAds.add(el);
  } catch (err) {
    console.warn("AdSense push error:", err);
  }
}
