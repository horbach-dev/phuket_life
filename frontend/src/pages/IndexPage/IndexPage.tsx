import type { FC } from 'react';
import { Button } from "@telegram-apps/telegram-ui";
import { ArrowRightOutlined } from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import { Page } from '@/components/Page.tsx';
import FirstSection from "@/components/FirstSection";
import HotOffers from "@/components/HotOffers";
import CategoriesSection from "@/components/CategoriesSection";
import ArticleSection from "@/components/ArticleSection";

const IndexPage: FC = () => {
  const navigate = useNavigate()

  return (
    <Page back={false}>
      <div className="container">
        <FirstSection navigate={navigate} />
      </div>
      <ArticleSection />
      <CategoriesSection
        onChangeCategory={category => {
          navigate('/apartments', {state: {category}})
        }}
        button={(
          <Button
            mode='bezeled'
            size='s'
            Component={Link}
            // @ts-ignore
            to={'/apartments'}
            after={<ArrowRightOutlined />}
            className='main-page__hot__button'
          >
            В каталог
          </Button>
        )} />
      <div className="container">
        <HotOffers navigate={navigate} />
      </div>
    </Page>
  );
};

export default IndexPage;
