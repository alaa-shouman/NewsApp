import { apiClient } from "@/api/base";
import { ENDPOINTS } from "@/api/endpoints";
import { NewsResponse } from "@/types/news.types";

export const fetchTopHeadlines = async (count: number): Promise<NewsResponse> => {
  try {
    const response = await apiClient({
      method: "GET",
      endpoint: ENDPOINTS.News.topHeadlines,
      params: { max: count, lang: "en" },
    });
    return response as NewsResponse;
  } catch (error: any) {
    const errMessage = error?.response?.data?.message || error.message;
    throw {
      userMessage: errMessage,
      originalError: error,
    };
  }
};

export const searchArticles = async (
  keyword: string,
  count: number = 10
): Promise<NewsResponse> => {
  try {
    const response = await apiClient({
      method: "GET",
      endpoint: ENDPOINTS.News.search,
      params: { q: keyword, max: count, lang: "en" },
    });
    return response as NewsResponse;
  } catch (error: any) {
    const errMessage = error?.response?.data?.message || error.message;
    throw {
      userMessage: errMessage,
      originalError: error,
    };
  }
};

export const findByTitle = async (
  title: string,
  count: number = 10
): Promise<NewsResponse> => {
  try {
    const response = await apiClient({
      method: "GET",
      endpoint: ENDPOINTS.News.search,
      params: { q: title, in: "title", max: count, lang: "en" },
    });
    return response as NewsResponse;
  } catch (error: any) {
    const errMessage = error?.response?.data?.message || error.message;
    throw {
      userMessage: errMessage,
      originalError: error,
    };
  }
};
