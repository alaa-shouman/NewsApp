import { apiClient } from "@/api/base";
import { NewsResponse } from "@/types/news.types";

export const fetchTopHeadlines = (count: number): Promise<NewsResponse> =>
  apiClient({
    method: "GET",
    endpoint: "top-headlines",
    params: { max: count, lang: "en" },
  }) as Promise<NewsResponse>;

export const searchArticles = (
  keyword: string,
  count: number = 10
): Promise<NewsResponse> =>
  apiClient({
    method: "GET",
    endpoint: "search",
    params: { q: keyword, max: count, lang: "en" },
  }) as Promise<NewsResponse>;

export const findByTitle = (
  title: string,
  count: number = 10
): Promise<NewsResponse> =>
  apiClient({
    method: "GET",
    endpoint: "search",
    params: { q: title, in: "title", max: count, lang: "en" },
  }) as Promise<NewsResponse>;
