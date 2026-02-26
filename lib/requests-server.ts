// lib/requests-server.ts
import { serverFetch } from "./server-fetch";

/* ================= AUTH ================= */

export const getLoggedInUser = () =>
  serverFetch("/user/me", { revalidate: 0 }); // never cache session

/* ================= HOME ================= */

export const getHomeGridPosts = () =>
  serverFetch("/home/get-featured-posts");

export const getTopNinePosts = () =>
  serverFetch("/home/get-top-nine");

export const getTrendingNews = () =>
  serverFetch("/home/get-trends");

export const getMostviewedNews = () =>
  serverFetch("/news/trending");

export const getHotTopics = () =>
  serverFetch("/home/get-hot-topics");

export const getBreakingNews = () =>
  serverFetch("/home/get-breaking-news");

export const getCategoryTopPosts = (category: string) =>
  serverFetch("/home/get-category-top", {
    params: { category },
  });

export const getMovieReleases = () =>
  serverFetch("/home/get-movie-releases");

export const getMovieCollections = () =>
  serverFetch("/home/get-movie-collections");

/* ================= ADS ================= */

export const getPopupPoster = () =>
  serverFetch("/home/get-popup-poster");

export const getMoviePoster = () =>
  serverFetch("/home/get-movie-poster");

export const getNavbarAd = () =>
  serverFetch("/home/get-navbar-ad");

export const getHomeLongAd = () =>
  serverFetch("/home/get-home-long-ad");

export const getHomeShortAd = () =>
  serverFetch("/home/get-home-short-ad");

export const getCategoryLongAd = () =>
  serverFetch("/home/get-category-long-ad");

export const getCategoryShortAd = () =>
  serverFetch("/home/get-category-short-ad");

export const getNewsLongAd = () =>
  serverFetch("/home/get-news-long-ad");

export const getNewsShortAd = () =>
  serverFetch("/home/get-news-short-ad");

/* ================= NEWS ================= */

export const getLatestNews = () =>
  serverFetch("/news/latest", { revalidate: 120 });

export const getFilteredNews = (params: Record<string, any>) =>
  serverFetch("/news/filter", {
    params,
  });

export const getCategoryNewsPosts = (params: Record<string, any>) =>
  serverFetch("/news/category", {
    params,
    revalidate: 120,
  });

export const getSingleNews = (id: string) =>
  serverFetch(`/news/n/${id}`, { revalidate: 300 });

export const getSearchNews = (
  query: string,
  page = 1,
  limit = 9,
  type = "all"
) =>
  serverFetch("/news/search", {
    params: { query, page, limit, type },
  });

/* ================= REACTIONS ================= */

export const getNewsReactions = (id: string) =>
  serverFetch(`/news/${id}/reactions`, { revalidate: 0 });

/* ================= COMMENTS ================= */

export const getNewsComments = (id: string) =>
  serverFetch(`/comments/${id}`, {
    params: { language: "te" },
    revalidate: 0, // comments must be fresh
  });

/* ================= GALLERY ================= */

export const getFilteredGallery = (params: Record<string, any>) =>
  serverFetch("/gallery/filter", {
    params,
  });

export const getSingleGallery = (id: string) =>
  serverFetch(`/gallery/g/${id}`);

/* ================= VIDEOS ================= */

export const getFilteredVideos = (params: Record<string, any>) =>
  serverFetch("/videos/filter", {
    params,
  });

export const getVideo = (id: string) =>
  serverFetch(`/videos/v/${id}`);
