import { api } from "@/lib/api.ts";
import { TArticleResponse } from "@/api/articles/types";

const params = {
  fields: ['*', 'poster.*'],
}

export const getArticle = async (id: number): Promise<{ data: TArticleResponse }> => {
  const response = await api.get(`/items/pages/${id}`, { params })

  return response?.data;
}
