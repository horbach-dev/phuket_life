export type TArticleRequestParams = {
  limit: number
  offset: number
  sort: string | string[]
  fields: string[],
  meta: string,
  filter: any
}

export type TArticleResponse = {
  id: number,
  status: "draft" | 'published',
  sort: number,
  date_created: Date,
  date_updated: Date | null,
  page: string,
  title: string,
  description: string,
  poster: {
    id: string,
    storage: string,
    filename_disk: string,
    filename_download: string,
    title: string,
    type: string,
  }
}

export type TArticle = {
  id: number,
  createdAt: string
  page: string
  title: string
  description: string
  poster: string
}

export type TArticlesResponse = {
  data: TArticleResponse[],
  meta: {
    filter_count?: number;
  }
}
