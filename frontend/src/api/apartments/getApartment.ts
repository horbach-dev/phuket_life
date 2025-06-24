import { api } from "@/lib/api";
import {TApartmentResponse, TApartmentsRequestParams} from "@/api/apartments/types.ts";

export const getApartment = async (id: string, params: TApartmentsRequestParams): Promise<{ data: TApartmentResponse }> => {
  const response = await api.get(`/items/apartments/${id}`, { params })

  return response?.data;
}
