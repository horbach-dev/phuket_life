import { useParams } from 'react-router-dom';
import { Page } from '@/components/Page.tsx';
import Spinner from '@/components/Spinner';
import { useGetArticle } from "@/services/articles/useGetArticle";

import './ArticlePage.scss';

const ArticlePage = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetArticle(Number(id))

    if (isLoading || !data) {
        return <Spinner global />
    }

    return (
        <Page back={true}>
            <div className="article-page">
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
                    <div className='article-page__page' dangerouslySetInnerHTML={{
                        __html: data.page
                    }} />
                </div>
            </div>
        </Page>
    )
}

export default ArticlePage
