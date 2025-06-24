import { useInfiniteQuery } from '@tanstack/react-query';
import { getApartments } from "@/api/apartments/getApartments";
import { mapApartmentDTOToModel } from "@/api/apartments/dto";
import { buildFilter } from "@/api/apartments/utils";
import { TApartmentsRequestParams, TApartmentsResponse } from "@/api/apartments/types";
import {IApartment, TFilter} from "@/types/apartment.ts";

const defaultParams = {
  limit: 10,
  offset: 1,
  sort: ['sort'],
  fields: ['*', 'photos.directus_files_id.*'],
  meta: 'filter_count',
}

type TParams = Partial<Omit<TApartmentsRequestParams, 'filter'> & { filter?: Partial<TFilter> }>

export const useApartmentsQuery = (params?: TParams) => {
  const parameters = {
    ...defaultParams,
    ...params,
    filter: buildFilter(params?.filter),
  }

  return useInfiniteQuery<TApartmentsResponse, Error, { apartments: IApartment[]; total: number }>({
    queryKey: ['getApartments', parameters],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getApartments({ ...parameters, offset: pageParam as number }),
    select: (data) => {
      return {
        apartments: data.pages.flatMap(page =>
          page.data.flatMap(mapApartmentDTOToModel) ?? []
        ),
        total: data?.pages[0]?.meta?.filter_count ?? 0,
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.data).length;
      const total = lastPage?.meta?.filter_count || 0;
      return loaded < total ? loaded : undefined;
    },
  })
};

