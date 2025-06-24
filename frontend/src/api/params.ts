import { api } from "@/lib/api";

export const getParameters = async (): Promise<{ data: { id: number, manager_link: string } }> => {
  const response = await api.get('/items/params')

  return response?.data;
}
