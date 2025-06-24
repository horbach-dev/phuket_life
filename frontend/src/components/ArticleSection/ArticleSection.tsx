import { Button } from '@telegram-apps/telegram-ui';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import SectionHeader from "@/components/SectionHeader";
import { useGetArticles } from "@/services/articles/useGetArticles";

import './ArticleSection.scss';

const ArticleSection = () => {
  const { data, isError, isLoading} = useGetArticles({ limit: 10 })

  if (isError || (!data?.articles?.length && !isLoading)) {
    return null
  }

  return (
    <section className='posts-section'>
      <div className="container">
      <SectionHeader
        title='Последние статьи'
        action={(
          <Button
            mode='bezeled'
            size='s'
            Component={Link}
            // @ts-ignore
            to='/articles'
            disabled={isLoading}
            loading={isLoading}
            after={<ArrowRightOutlined />}
            className='main-page__hot__button'
          >
            <span>{'См. все'}</span>
          </Button>
        )}
      />
      </div>
      <div className="posts-section__posts">
      <div className='posts-section__list'>
        {data?.articles.length ? data.articles.map((item: any) => {
          return (
            <Link
              key={item.title}
              to={`/articles/${item.id}`}
              className='posts-section__item'
            >
              <img src={item.poster} alt={item.title} />
              <span className="posts-section__item-shadow" />
              <p className='posts-section__item-title'>{item.title}</p>
              <p className='posts-section__item-date'>{item.createdAt}</p>
            </Link>
          )
        }) : (
          <>
            <div className='posts-section__item'>
              <span className="posts-section__item-shadow" />
              <p className='posts-section__item-title_skeleton'>______</p>
              <p className='posts-section__item-date_skeleton'>___</p>
            </div>
            <div className='posts-section__item'>
              <span className="posts-section__item-shadow" />
              <p className='posts-section__item-title_skeleton'>______</p>
              <p className='posts-section__item-date_skeleton'>___</p>
            </div>
            <div className='posts-section__item'>
              <span className="posts-section__item-shadow" />
              <p className='posts-section__item-title_skeleton'>______</p>
              <p className='posts-section__item-date_skeleton'>___</p>
            </div>
          </>
        )}
      </div>
      </div>
    </section>
  );
};

  export default ArticleSection;
