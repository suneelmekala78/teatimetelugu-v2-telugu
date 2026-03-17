"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
        ఏదో తప్పు జరిగింది
      </h1>

      <p style={{ color: "#666", maxWidth: 480 }}>
        పేజీని లోడ్ చేయడంలో సమస్య ఏర్పడింది. దయచేసి మళ్ళీ ప్రయత్నించండి.
      </p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button
          onClick={reset}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          మళ్ళీ ప్రయత్నించండి
        </button>

        <Link
          href="/"
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            color: "#111",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.95rem",
          }}
        >
          <FaHome /> హోమ్
        </Link>
      </div>
    </section>
  );
}
