// lib/requests-server.ts
import { serverFetch } from "./server-fetch";
import { publicFetch } from "./server-fetch-public";

/* ================= AUTH ================= */

export const getLoggedInUser = () =>
  serverFetch("/user/me", { revalidate: 0 }); // never cache session

/* ================= HOME ================= */

export const getHomePageData = () =>
  publicFetch("/home/home-page-data");

export const getHomeGridPosts = () =>
  publicFetch("/home/get-featured-posts");

export const getTopNinePosts = () =>
  publicFetch("/home/get-top-nine");

export const getTrendingNews = () =>
  publicFetch("/home/get-trends");

export const getMostviewedNews = () =>
  publicFetch("/news/trending");

export const getHotTopics = () =>
  publicFetch("/home/get-hot-topics");

export const getBreakingNews = () =>
  publicFetch("/home/get-breaking-news");

export const getCategoryTopPosts = (category: string) =>
  publicFetch("/home/get-category-top", {
    params: { category },
  });

export const getMovieReleases = () =>
  publicFetch("/home/get-movie-releases");

export const getMovieCollections = () =>
  publicFetch("/home/get-movie-collections");

/* ================= ADS ================= */

export const getPopupPoster = () =>
  publicFetch("/home/get-popup-poster");

export const getMoviePoster = () =>
  publicFetch("/home/get-movie-poster");

export const getNavbarAd = () =>
  publicFetch("/home/get-navbar-ad");

export const getHomeLongAd = () =>
  publicFetch("/home/get-home-long-ad");

export const getHomeShortAd = () =>
  publicFetch("/home/get-home-short-ad");

export const getCategoryLongAd = () =>
  publicFetch("/home/get-category-long-ad");

export const getCategoryShortAd = () =>
  publicFetch("/home/get-category-short-ad");

export const getNewsLongAd = () =>
  publicFetch("/home/get-news-long-ad");

export const getNewsShortAd = () =>
  publicFetch("/home/get-news-short-ad");

/* ================= NEWS ================= */

export const getLatestNews = () =>
  publicFetch("/news/latest", { revalidate: 120 });

export const getFilteredNews = (params: Record<string, any>) =>
  publicFetch("/news/filter", {
    params,
  });

export const getCategoryNewsPosts = (params: Record<string, any>) =>
  publicFetch("/news/category", {
    params,
    revalidate: 120,
  });

export const getSingleNews = (id: string) =>
  publicFetch(`/news/n/${id}`, { revalidate: 300 });

export const getSearchNews = (
  query: string,
  page = 1,
  limit = 9,
  type = "all"
) =>
  publicFetch("/news/search", {
    params: { query, page, limit, type },
    revalidate: 0,
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
  publicFetch("/gallery/filter", {
    params,
  });

export const getSingleGallery = (id: string) =>
  publicFetch(`/gallery/g/${id}`);

/* ================= VIDEOS ================= */

export const getFilteredVideos = (params: Record<string, any>) =>
  publicFetch("/videos/filter", {
    params,
  });

export const getVideo = (id: string) =>
  publicFetch(`/videos/v/${id}`);
