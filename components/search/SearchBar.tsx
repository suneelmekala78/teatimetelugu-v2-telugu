"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

type Props = {
  initial?: string;
  onSearch?: (text: string) => void;
};

export default function SearchBar({ initial = "", onSearch }: Props) {
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

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search news..."
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        <IoSearchOutline />
        <span>శోధించండి</span>
      </button>
    </form>
  );
}
