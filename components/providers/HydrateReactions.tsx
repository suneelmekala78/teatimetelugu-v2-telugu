"use client";

import { useEffect, useRef } from "react";
import { useUserStore, Reaction } from "@/store/useUserStore";

export default function HydrateReactions({
  reactions,
  children,
}: {
  reactions: Reaction[];
  children: React.ReactNode;
}) {
  const setReactions = useUserStore((s) => s.setReactions);

  const hydrated = useRef(false); // ✅ prevents overwrite

  useEffect(() => {
    if (!hydrated.current) {
      setReactions(reactions);
      hydrated.current = true;
    }
  }, [reactions, setReactions]);

  return children;
}
