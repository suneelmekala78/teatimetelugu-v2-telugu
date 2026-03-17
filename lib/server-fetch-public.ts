const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function publicFetch(
  path: string,
  options?: { params?: Record<string, any>; revalidate?: number }
): Promise<any> {
  const { params, revalidate = 60 } = options || {};

  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";

  const res = await fetch(`${BASE}${path}${query}`, {
    next: { revalidate },
  });

  if (!res.ok) return null as any;

  return res.json();
}
