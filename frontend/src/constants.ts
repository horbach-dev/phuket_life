export const BASE_URL = import.meta.env.VITE_API_END_POINT;
export const BOT_USERNAME = import.meta.env.VITE_BOT_USERNAME;

export const defaultFilterValues = {
  minPrice: '',
  maxPrice: '',
  type: [],
  bedrooms: [],
  bathrooms: [],
  tags: []
}

export const categories = [
  { title: 'Готовые объекты', category: 'resale' },
  { title: 'Виллы в стройке', category: 'villas' },
  { title: 'Апартаменты в стройке', category: 'apartments' },
]
