import { TApartmentCategory } from "@/types/apartment";

type TApartmentPhoto = {
  directus_files_id: {
    id: string
    storage: string
    title: string
    type: string
    filename_disk: string
    filename_download: string
    filesize: number
  }
}

export type TApartmentResponse = {
  id: string
  location: string | null
  name: string
  price: null | number
  priceFrom: null | number
  priceTo: null | number
  quarter: null | string
  year_of_delivery: null | string
  sort: null | string
  photos: TApartmentPhoto[]
  about: null | string
  area: null | number
  monthly_rent: boolean | null
  living_area: null | number
  bathrooms: null | number
  bedrooms: null | number
  status: string
  tags: any[]
  type: any[]
  category: TApartmentCategory
  date_created: Date
  date_updated: Date
  desc: null | string
  furniture: boolean
}

export type TApartmentsFilterParams = {
  status?: Record<string, any>
  category?: Record<string, any>
  bedrooms?: { _in: string[] }
  bathrooms?: { _in: string[] }
  tags?: { tags_id: { _in: string[] } }
  type?: { _in: string[] }
  _or?: any
}

export type TApartmentsRequestParams = {
  limit?: number
  offset?: number
  sort?: string | string[]
  fields: string[]
  meta?: string
  filter?: TApartmentsFilterParams
}

export type TApartmentsResponse = {
  data: TApartmentResponse[],
  meta?: {
    filter_count?: number;
  }
}
