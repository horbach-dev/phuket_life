import { api } from "@/lib/api";
import { TApartmentsResponse, TApartmentsRequestParams } from "./types";

export const getApartments = async (params: Partial<TApartmentsRequestParams>): Promise<TApartmentsResponse> => {
  const response = await api.get('/items/apartments', { params })

  return response?.data;
}
