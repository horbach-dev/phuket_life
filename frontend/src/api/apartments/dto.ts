import { TApartmentResponse } from "./types";
import { IApartment } from "@/types/apartment.ts";
import { BASE_URL } from "@/constants.ts";

export const mapApartmentDTOToModel = (item: TApartmentResponse): IApartment  => {
  return {
    id: item.id,
    title: item.name,
    description: item.desc,
    price: item.price,
    priceFrom: item.priceFrom,
    priceTo: item.priceTo,
    location: item.location,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    category: item.category,
    type: item.type as any,
    area: item.area,
    livingArea: item.living_area,
    monthlyRent: item.monthly_rent,
    tags: item?.tags?.length ? item.tags.map(i => i?.tags_id?.title) : [],
    about: item.about,
    quarter: item.quarter,
    furniture: item.furniture,
    yearOfDelivery: item.year_of_delivery,
    photos: item.photos.length ? item.photos.map(photo => `${BASE_URL}/assets/${photo.directus_files_id.filename_disk}`) : [],
  }
}

export const toCategoryPriceModel = (data: any, category: string, title: string) => {
  if (data) {
    return {
      title,
      category,
      value: data.priceFrom || data.price || 0,
    }
  }

  return {
    title,
    category,
    value: 0
  }
}
