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
  { title: 'Resale', category: 'resale' },
  { title: 'Виллы', category: 'villas' },
  { title: 'Аренда', category: 'rent' },
  { title: 'Апартаменты', category: 'apartments' },
]
