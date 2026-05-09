import axios, { AxiosError } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
  method: HttpMethod;
  endpoint: string;
  data?: unknown;
  params?: Record<string, string | number | undefined>;
}

const BASE_URL = "https://gnews.io/api/v4";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const apiClient = async ({
  method,
  endpoint,
  data,
  params,
}: ApiOptions): Promise<unknown> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const queryParams: Record<string, string | number> = { apikey: API_KEY ?? "" };

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams[key] = value;
    });
  }

  const url = `${BASE_URL}/${endpoint}`;

  const options = {
    method,
    url,
    headers,
    params: method === "GET" ? queryParams : undefined,
    data: method !== "GET" ? data : undefined,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.errors?.[0] ?? error.message;

      if (status !== 404) {
        console.error(`API Error [${status}]:`, message);
      }
    } else {
      console.error("API Error: An unknown error occurred");
    }
    throw error;
  }
};
