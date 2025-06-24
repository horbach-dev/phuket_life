import { useQuery } from '@tanstack/react-query';
import { getApartment } from "@/api/apartments/getApartment";
import {mapApartmentDTOToModel} from "@/api/apartments/dto.ts";

const defaultParams = {
  fields: ['*', 'photos.directus_files_id.*', 'tags.tags_id.title'],
  meta: 'filter_count',
}

export const useApartmentQuery = (id: string) => {
  return useQuery({
    queryKey: ['getApartment', id, defaultParams],
    queryFn: () => getApartment(id, defaultParams),
    select: (data) => {

      return data?.data ? mapApartmentDTOToModel(data?.data) : null
    },
  })
};

