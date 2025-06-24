export type TApartmentCategory = 'resale' | 'villas' | 'rent' | 'apartments'
export type TApartmentType = 'house' | 'townhouse' | 'villa' | 'apartment'

export interface IApartment {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  priceFrom: number | null;
  priceTo: number | null;
  category: TApartmentCategory
  location: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  type: TApartmentType;
  area: number | null;
  livingArea: number | null;
  photos: string[] | [];
  tags: any[]
  about: string | null;
}

export type TFilter = {
  status?: string
  category?: TApartmentCategory,
  minPrice: string,
  maxPrice: string,
  bedrooms: string[],
  bathrooms: string[],
  tags: string[],
  type: TApartmentType[]
}

