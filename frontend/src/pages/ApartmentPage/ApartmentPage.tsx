import {Link, useParams} from 'react-router-dom';
import {
  ArrowRightOutlined,
  EnvironmentFilled,
} from '@ant-design/icons';
import Empty from '@/components/Empty';
import { Page } from '@/components/Page.tsx';
import Spinner from '@/components/Spinner';
import {Button, Chip} from '@telegram-apps/telegram-ui';
import ApartmentSlider from '@/components/ApartmentSlider';
import Description from './components/Description';
import Sharing from './components/Sharing';
import Characteristics from './components/Сharacteristics';
import {useApartmentQuery} from "@/services/apartments/useApartmentQuery";
import {amountFormat} from "@/helpers/amountFormat";

import './ApartmentPage.scss';

function ApartmentPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError } = useApartmentQuery(id)

  if (isLoading) {
    return <Spinner global />
  }

  if (isError) {
    return (
      <Empty
        title='Ошибка загрузки объекта'
        isFull
        action={(
          <Button
            mode='bezeled'
            size='s'
            Component={Link}
            // @ts-ignore
            to='/apartments'
            after={<ArrowRightOutlined />}
          >
            В каталог объектов
          </Button>
        )}
      />)
  }

  if (!data) {
    return null
  }

  return (
    <Page back={true}>
        <div className='apartment-page'>
            <ApartmentSlider
                radius={false}
                images={data.photos}
                title={data.title}
            />
        </div>
        <div className='apartment-page__info'>
            <h1 className='apartment-page__title'>{data.title}</h1>
          {data.location && <p className='apartment-card__location'>
                <EnvironmentFilled className='apartment-card__icon' />
                {data.location}
            </p>}
            {/*<p className='apartment-card__bedrooms'>*/}
            {/*    <HomeFilled className='apartment-card__icon' />*/}
            {/*    {data.bedrooms} {'спальни'}: {data.area} {'m'} <sup>2</sup>*/}
            {/*</p>*/}


          {data.price ? (
            <p className='apartment-page__price'>{amountFormat(data.price)}</p>
          ) : (
            <>
              {data.priceFrom && !data.priceTo && (
                <p className='apartment-page__price'>от {amountFormat(data.priceFrom)}</p>
              )}

              {!data.priceFrom && data.priceTo && (
                <p className='apartment-page__price'>до {amountFormat(data.priceTo)}</p>
              )}

              {data.priceFrom && data.priceTo && (
                <p className='apartment-page__price apartment-page__price_double'>
                  <span>от {amountFormat(data.priceFrom)}</span>
                  <span>до {amountFormat(data.priceTo)}</span>
                </p>
              )}
            </>
          )}

          {!data.priceFrom && !data.priceTo && !data.price && (
            <p className='apartment-page__price'>{'Цена по запросу'}</p>
          )}

            <Characteristics apartment={data} />

            <Sharing
              title={data.title}
              price={data.price}
              priceFrom={data.priceFrom}
              apartmentId={data.id}
              location={data.location}
            />

            {data.description && (
                <Description description={data.description} />
            )}

            {data.about && (
                <>
                    <p className='section-title'>{'О застройщике'}</p>
                        <div className="apartment-page__developer">
                        {data.about}
                    </div>
                </>
            )}

            {data.tags.length ? (
                <>
                    <p className='section-title'>{'Удобства'}</p>
                    <div className="apartment-page__features">
                        {data.tags.map((item: any) => (
                        <Chip key={item}>{item}</Chip>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    </Page>
);
}

export default ApartmentPage;
