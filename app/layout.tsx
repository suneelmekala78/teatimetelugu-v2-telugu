import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/common/footer/Footer";
import NetworkProvider from "@/components/providers/NetworkProvider";
import AuthBootstrap from "@/components/providers/AuthBootstrap";
import NavbarWrapper from "@/components/common/navbar/NavbarWrapper";
import ClientShell from "./ClientShell";
import AdScript from "@/components/google-ads/AdScript";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const SITE_BASE =
  process.env.NEXT_PUBLIC_CLIENT_URL || "https://teatimetelugu.com";

const SITE_TITLE =
  "టీ టైం తెలుగు - AP మరియు TS రాజకీయాలు, సినిమాలు మరియు గాసిప్‌లపై తెలుగు వార్తలు";

const SITE_DESCRIPTION =
  "తెలుగు మాట్లాడే ప్రేక్షకుల కోసం తాజా వార్తలు, సినిమా అప్‌డేట్స్, గాసిప్స్ మరియు వినోదం. బ్రేకింగ్ న్యూస్, సినిమా సమీక్షలు, OTT రిలీజ్ అప్‌డేట్స్, రాజకీయ విశ్లేషణలు మరియు స్టార్‌ల ఇంటర్వ్యూలతో ప్రత్యేకంగా అందించే ప్లాట్‌ఫార్మ్.";

const SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "n5Z9FmEzjRRyrO9W7lvdr_Hh1NAxDbebpBW1J1OmadY";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "te_IN",
    url: SITE_BASE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "టీ టైం తెలుగు",
    images: [{ url: "/images/logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/logo.jpg"],
  },
  verification: {
    google: SITE_VERIFICATION,
  },
  other: {
    "google-adsense-account": "ca-pub-2480610460273610",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <body className="antialiased">
        <GoogleAnalytics />
        <AdScript />
        <Toaster position="top-center" richColors />
        <AuthBootstrap>
          <div className="page-container">
            <NavbarWrapper />
            <NetworkProvider>
              <ClientShell>{children}</ClientShell>
            </NetworkProvider>
            <Footer />
          </div>
        </AuthBootstrap>
      </body>
    </html>
  );
}
