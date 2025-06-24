import {useEffect} from "react";
import {useGetArticles} from "@/services/articles/useGetArticles";
import {useIntersectionObserver} from "@/hooks/useInterserctionObserver";
import { Page } from '@/components/Page';
import PostCard, { PоstCardSkeleton } from './components/PostCard';
import Empty from "@/components/Empty/Empty"

import './ArticlesPage.scss'

const ArticlesPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetArticles()
  const { ref, isIntersecting } = useIntersectionObserver({ rootMargin: '150px' })

  useEffect(() => {
    if (hasNextPage && isIntersecting && !isFetchingNextPage) {
      fetchNextPage()
    }

  }, [isIntersecting, hasNextPage, fetchNextPage, isFetchingNextPage])

  if (!isLoading && !data?.articles?.length) {
    return <Empty title='Постов не найдено' />
  }

  return (
    <Page back={true}>
      <div className="posts-page">
        {data?.articles?.length ? (
          data.articles.map(item => {
            return (
              <PostCard
                id={item.id}
                key={item.id}
                poster={item.poster}
                title={item.title}
                description={item.description}
                createdAt={item.createdAt}
              />
            )
          })
            ) : (
              <>
                <PоstCardSkeleton />
                <PоstCardSkeleton />
                <PоstCardSkeleton />
              </>
            )}
      {isFetchingNextPage && <PоstCardSkeleton />}
      </div>
      <div ref={ref} />
    </Page>
    )
}

export default ArticlesPage
