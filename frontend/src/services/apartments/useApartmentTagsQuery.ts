import { useQuery } from '@tanstack/react-query';
import { getApartmentTags } from "@/api/apartments/getApartmentTags";

export const useApartmentQuery = () => {
  return useQuery({
    queryKey: ['getApartmentTags'],
    queryFn: getApartmentTags,
  })
};

