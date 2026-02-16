"use client";

import styles from "./AuthPopup.module.css";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AuthPopup({ open, onClose }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ---------- Build current full path ---------- */
  const fullPath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  /* ---------- Google login redirect URL ---------- */
  const googleUrl = useMemo(() => {
    const redirectUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}${fullPath}`;

    return (
      `${process.env.NEXT_PUBLIC_API_URL}/auth/join-with-google` +
      `?client=${encodeURIComponent(redirectUrl)}`
    );
  }, [fullPath]);

  /* ---------- Close popup on ESC ---------- */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Prevent closing when clicking inside */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.close} onClick={onClose}>
          <IoClose size={22} />
        </button>

        <h2 className={styles.title}>లాగిన్</h2>

        <a href={googleUrl} className={styles.googleBtn}>
          <Image src="/images/google.png" alt="Google" width={20} height={20} />
          <span>Google తో కొనసాగించండి</span>
        </a>
      </div>
    </div>
  );
}
