import MovieTabsTableClient from "./MovieTabsTableClient";
import { getMovieReleases } from "@/lib/requests-server";

interface Props {
  rows?: any[];
}

export default async function MovieSchedules({ rows: propRows }: Props) {
  let rows: any[] = propRows || [];

  if (!propRows) {
    try {
      const res = await getMovieReleases();
      if (res?.status === "success") {
        rows = res.movieReleases || [];
      }
    } catch {}
  }

  return (
    <MovieTabsTableClient
      title="సినిమా విడుదలలు"
      tabs={[
        { label: "సినిమా", value: "movie" },
        { label: "ఓటీటీ", value: "ott" },
      ]}
      rows={rows}
      nameKey="movie"
      valueKey="date"
    />
  );
}
