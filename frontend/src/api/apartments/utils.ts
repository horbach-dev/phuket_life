import { TApartmentsFilterParams } from './types'
import {TFilter} from "@/types/apartment.ts";

const defaultResult = {
  status: { _eq: 'published' },
}

export const buildFilter = (filter?: Partial<TFilter>): TApartmentsFilterParams => {
  if (!filter) return defaultResult

  const result: TApartmentsFilterParams = {
    ...defaultResult,
  }

  if (filter.status) {
    result.status = { _eq: filter.status }
  }

  if (filter.type?.length) {
    result.type = {
      _in: filter.type
    };
  }

  if (filter.bedrooms?.length) {
    result.bedrooms = {
      _in: filter.bedrooms
    };
  }

  if (filter.bathrooms?.length) {
    result.bathrooms = {
      _in: filter.bathrooms
    };
  }

  if (filter.tags?.length) {
    result.tags = {
      tags_id: { _in: filter.tags }
    }
  }

  if (filter.minPrice || filter.maxPrice) {
    const minPriceNum = filter.minPrice !== '' ? Number(filter.minPrice) : undefined
    const maxPriceNum = filter.maxPrice !== '' ? Number(filter.maxPrice) : undefined

    result._or = {
      0: {
        // фиксированная цена
        price: {
          ...(minPriceNum !== undefined ? { _gte: minPriceNum } : {}),
          ...(maxPriceNum !== undefined ? { _lte: maxPriceNum } : {}),
        },
      },
      1: {
        // диапазон цен
        priceFrom: {
          ...(minPriceNum !== undefined ? { _gte: minPriceNum } : {}),
        },
        priceTo: {
          ...(maxPriceNum !== undefined ? { _lte: maxPriceNum } : {}),
        }
      }
    } as any
  }

  if (filter.category?.length) {
    result.category = { _in: Array.isArray(filter.category) ? filter.category: [filter.category] }
  }

  return result
}
