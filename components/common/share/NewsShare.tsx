"use client";

import { FaFacebookF, FaWhatsapp, FaInstagram, FaXTwitter, FaShareNodes } from "react-icons/fa6";
import styles from "./NewsShare.module.css";
import { toast } from "sonner";

interface Props {
  title: string;
}

export default function NewsShare({ title }: Props) {
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  /* ---------- SHARE HANDLERS ---------- */

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "width=600,height=500"
    );
  };

  const shareWhatsapp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + "\n\n" + shareUrl)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "width=600,height=500"
    );
  };

  const shareInstagram = () => {
    // Instagram doesn't support direct web sharing
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied! Share it on Instagram.");
  };

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard");
      }
    } catch {}
  };

  /* ---------- UI ---------- */

  return (
    <div className={styles.shareIcons}>
      <button className={`${styles.iconBtn} ${styles.facebook}`} onClick={shareFacebook}>
        <FaFacebookF />
      </button>

      <button className={`${styles.iconBtn} ${styles.whatsapp}`} onClick={shareWhatsapp}>
        <FaWhatsapp />
      </button>

      <button className={`${styles.iconBtn} ${styles.instagram}`} onClick={shareInstagram}>
        <FaInstagram />
      </button>

      <button className={`${styles.iconBtn} ${styles.twitter}`} onClick={shareTwitter}>
        <FaXTwitter />
      </button>

      <button className={`${styles.iconBtn} ${styles.share}`} onClick={nativeShare}>
        <FaShareNodes />
        <span>Share</span>
      </button>
    </div>
  );
}
