import {useQuery} from "@tanstack/react-query";
import {getArticle} from "@/api/articles/getArticle";
import {mapArticleDTOToModel} from "@/api/articles/dto.ts";

export const useGetArticle = (id: number) => {
  return useQuery({
    queryKey: ['getArticle', id],
    queryFn: () => getArticle(id),
    select: (data) => {
      if (data?.data) {
        return mapArticleDTOToModel(data.data)
      }
    },
  })
};
