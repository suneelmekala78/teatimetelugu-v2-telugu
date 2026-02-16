/* ---------- common ---------- */

export interface ApiSuccess<T> {
  status: "success";
  data?: T;
}

/* ---------- news ---------- */

export interface NewsReaction {
  _id: string;
  userId: string;
  type: string;
}

export interface NewsItem {
  _id: string;
  newsId: string;
  mainUrl: string;
  createdAt: string;

  title: {
    te: string;
    en?: string;
  };

  description: {
    te: {
      text?: string;
      withTags?: string;
    };
  };

  reactions: NewsReaction[];
}

export interface GetSingleNewsResponse {
  status: "success";
  news: NewsItem;
  suggestedNews: NewsItem[];
}
