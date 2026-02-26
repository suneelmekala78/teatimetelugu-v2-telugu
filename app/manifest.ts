import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "టీ టైం తెలుగు",
    short_name: "టీ టైం",
    description:
      "తెలుగు మాట్లాడే ప్రేక్షకుల కోసం తాజా వార్తలు, సినిమా అప్‌డేట్స్, గాసిప్స్ మరియు వినోదం.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "te",
    icons: [
      {
        src: "/images/logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
