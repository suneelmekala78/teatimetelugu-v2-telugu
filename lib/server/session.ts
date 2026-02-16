import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API_URL!;

/* helper to serialize cookies (NEXT 15 requires async) */
async function serializeCookies() {
  const cookieStore = await cookies(); // ✅ MUST await

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export async function getServerUser() {
  const cookieHeader = await serializeCookies();

  const res = await fetch(`${API}/user/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.user ?? null;
}
