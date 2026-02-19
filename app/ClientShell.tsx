"use client";

import { useEffect, useState } from "react";
import PopupPoster from "@/components/common/popups/poster/PopupPoster";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("ttt-te-popupLastShown");
    const now = Date.now();

    /* show popup once every 10 minutes */
    if (!lastShown || now - Number(lastShown) > 10 * 60 * 1000) {
      setShowPopup(true);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem("ttt-te-popupLastShown", Date.now().toString());
    setShowPopup(false);
  };

  return (
    <>
      {children}
      {showPopup && <PopupPoster closePopup={closePopup} />}
    </>
  );
}
