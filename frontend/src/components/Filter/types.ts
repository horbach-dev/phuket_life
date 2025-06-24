import { TApartmentCategory, TApartmentType } from "@/types/apartment";

export type TFilter = {
    category: TApartmentCategory[] | TApartmentCategory,
    minPrice: string,
    maxPrice: string,
    bedrooms: number[],
    bathrooms: number[],
    tags: string[],
    type: TApartmentType[]
}
