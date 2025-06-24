import { api } from "@/lib/api.ts";
import { TArticleRequestParams, TArticlesResponse } from "@/api/articles/types.ts";

export const getArticles = async (params: TArticleRequestParams): Promise<TArticlesResponse> => {
  const response = await api.get('/items/pages', { params })

  return response?.data;
}
