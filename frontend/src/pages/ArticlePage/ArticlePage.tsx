import { useParams } from 'react-router-dom';
import { useRef } from "react";
import { Page } from '@/components/Page.tsx';
import Spinner from '@/components/Spinner';
import { useGetArticle } from "@/services/articles/useGetArticle";
import { ArticlePageContent } from "./components/ArticlePageContent";

import './ArticlePage.scss';

const ArticlePage = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetArticle(Number(id))
    const pageRef = useRef<HTMLDivElement | null>(null)

    if (isLoading || !data) {
        return <Spinner global />
    }

    return (
        <Page back={true}>
            <div
              ref={pageRef}
              className="article-page"
            >
                <img
                  src={data.poster}
                  alt={data.title}
                  className="article-page__poster"
                />
                <div className="container">
                    <p className="article-page__date">
                        {data.createdAt}
                    </p>
                    <h1 className="article-page__title">
                        {data.title}
                    </h1>
                    <ArticlePageContent
                      pageRef={pageRef}
                      page={data.page}
                    />
                </div>
            </div>
        </Page>
    )
}

export default ArticlePage
