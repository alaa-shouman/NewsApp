export interface NewsSource {
  name: string;
  url: string;
}

export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: NewsSource;
}

export interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}

export type SearchMode = "headlines" | "search";
