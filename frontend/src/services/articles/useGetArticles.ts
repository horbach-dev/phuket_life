import { useInfiniteQuery } from "@tanstack/react-query";
import { TArticle, TArticleRequestParams, TArticlesResponse } from "@/api/articles/types.ts";
import { getArticles } from "@/api/articles/getArticles.ts";
import { mapArticleDTOToModel } from "@/api/articles/dto.ts";

const defaultParams = {
  limit: 10,
  sort: ['sort'],
  fields: ['*', 'poster.*'],
  meta: 'filter_count',
  filter: {
    status: { _eq: 'published' }
  }
};

export const useGetArticles = (params?: Partial<TArticleRequestParams>) => {
  return useInfiniteQuery<TArticlesResponse, Error, { articles: TArticle[]; total: number }>({
    queryKey: ['getArticles', params],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => {
      return getArticles({
        ...defaultParams,
        ...params,
        offset: pageParam as number,
      });
    },
    select: (data) => {
      // Склеиваем все страницы и мапим
      return {
        articles: data.pages.flatMap(page =>
          page.data?.map(mapArticleDTOToModel) ?? []
        ),
        total: data?.pages[0]?.meta?.filter_count ?? 0,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.data).length;
      const total = lastPage.meta.filter_count || 0;
      return loaded < total ? loaded : undefined;
    },
  });
};
