import { api } from "@/lib/api";

export const getMinPriceByCategory = async (category: string, priceType: 'priceFrom' | 'price') => {
  const response = await api.get('/items/apartments', {
    params: {
      filter: {
        category: { _eq: category },
        [priceType]: { _nnull: true }
      },
      sort: priceType,
      limit: 1,
      fields: [priceType],
    },
  });

  return response?.data
};
