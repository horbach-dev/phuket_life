import { useQuery } from '@tanstack/react-query';
import { getParameters } from "@/api/params.ts";

export const useGetParameters = () => {
  return useQuery({
    queryKey: ['getParameters'],
    queryFn: () => getParameters(),
    select: (data) => {

      return data?.data || null
    },
  })
};

