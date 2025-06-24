import { BASE_URL } from "@/constants.ts";
import { TArticle, TArticleResponse } from "@/api/articles/types.ts";

export const mapArticleDTOToModel = (item: TArticleResponse): TArticle  => {
  return {
    id: item.id,
    createdAt: new Date(item.date_created).toLocaleDateString('ru-RU'),
    page: item.page,
    title: item.title,
    description: item.description,
    poster: item?.poster?.filename_disk ? `${BASE_URL}/assets/${item.poster.filename_disk}` : '',
  }
}
