"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

type Props = {
  initial?: string;
  onSearch?: (text: string) => void;
  isLoading?: boolean;
};

export default function SearchBar({ initial = "", onSearch, isLoading = false }: Props) {
  const params = useSearchParams();
  const [text, setText] = useState(initial);

  /* Sync when user navigates with browser back/forward */
  useEffect(() => {
    setText(params.get("q") || "");
  }, [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const term = text.trim();

    if (!term) {
      onSearch?.("");   // let parent clear state
      return;
    }

    onSearch?.(term);   // 🔥 delegate to SearchClient
  };

  const isTooShort = text.trim().length > 0 && text.trim().length < 3;

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="వార్తలను శోధించండి..."
        className={styles.input}
        aria-label="Search news"
        autoComplete="off"
      />

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading || isTooShort}
        aria-disabled={isLoading || isTooShort}
      >
        <IoSearchOutline />
        <span>{isLoading ? "వెతుకుతున్నాం..." : "శోధించండి"}</span>
      </button>
    </form>
  );
}
