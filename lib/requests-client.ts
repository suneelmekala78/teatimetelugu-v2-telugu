"use client";

import { api } from "./api";

/* ================= AUTH ================= */

export const logoutUser = () =>
  api({ url: "/auth/logout", method: "POST" });

export const loginUser = (data: any) =>
  api({ url: "/auth/login", method: "POST", data });

export const contactUsEmail = (data: any) =>
  api({ url: "/user/contact-mail", method: "POST", data });

/* ================= REACTIONS ================= */

export const addNewsReaction = (id: string, data: any) =>
  api({ url: `/news/${id}/add-reaction`, method: "PUT", data });

export const addGalleryReaction = (id: string, data: any) =>
  api({ url: `/gallery/${id}/add-reaction`, method: "PUT", data });

/* ================= COMMENTS ================= */

export const addNewsComment = (id: string, data: any) =>
  api({ url: `/comments/${id}/add-comment`, method: "POST", data });

export const addNewsReplyComment = (id: string, data: any) =>
  api({ url: `/comments/${id}/add-reply-comment`, method: "POST", data });

export const deleteNewsComment = (id: string) =>
  api({ url: `/comments/${id}`, method: "DELETE" });

export const likeNewsComment = (id: string) =>
  api({ url: `/comments/${id}/like-comment`, method: "PUT" });

export const dislikeNewsComment = (id: string) =>
  api({ url: `/comments/${id}/dislike-comment`, method: "PUT" });
