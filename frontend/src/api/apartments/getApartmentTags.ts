import { api } from "@/lib/api";
import {} from "@/api/apartments/types.ts";

export const getApartmentTags = async (): Promise<{ id: number, title: string }[]> => {
  const response = await api.get('/items/tags')

  return response?.data?.data || [];
}
