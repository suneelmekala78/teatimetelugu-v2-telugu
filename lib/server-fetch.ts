"use server";

import { cookies } from "next/headers";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

/* serialize incoming request cookies */
async function serializeCookies() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

/* extract cookies from refresh response */
function extractSetCookie(res: Response): string | null {
  const raw = res.headers.get("set-cookie");
  if (!raw) return null;

  // we only need cookie=value part
  return raw
    .split(",")
    .map((c) => c.split(";")[0])
    .join("; ");
}

export async function serverFetch<T>(
  path: string,
  options?: {
    params?: Record<string, any>;
    revalidate?: number;
  }
): Promise<T> {
  const { params, revalidate = 60 } = options || {};

  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";

  let cookieHeader = await serializeCookies();

  /* first attempt */
  let res = await fetch(`${BASE}${path}${query}`, {
    headers: { Cookie: cookieHeader },
    next: { revalidate },
  });

  /* 🔥 if expired → refresh */
  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch(`${BASE}/auth/refresh-token`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
    });

    if (!refreshRes.ok) {
      throw new Error("Refresh token failed");
    }

    /* get NEW cookies issued by backend */
    const newCookies = extractSetCookie(refreshRes);

    if (newCookies) {
      cookieHeader = newCookies; // ✅ use fresh token now
    }

    /* retry with fresh cookie */
    res = await fetch(`${BASE}${path}${query}`, {
      headers: { Cookie: cookieHeader },
      next: { revalidate },
    });
  }

  if (!res.ok) throw new Error(`API failed: ${path}`);

  return res.json();
}
