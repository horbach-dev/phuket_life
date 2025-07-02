import { HomeFilled, EnvironmentFilled } from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom';
import { Button } from '@telegram-apps/telegram-ui';
import ApartmentsSlider from '@/components/ApartmentSlider';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import {amountFormat} from "@/helpers/amountFormat";
import { IApartment } from "@/types/apartment";

import './ApartmentCard.scss';

interface IProps extends IApartment {
    managerLink: string | undefined
}

const ApartmentCard = ({
    photos,
    title,
    location,
    price,
    priceFrom,
    priceTo,
    bedrooms,
    managerLink,
    area,
    id
}: IProps) => {
    const navigate = useNavigate();

    const vibrationCallback = () => {
        hapticFeedback.impactOccurred('light')
    }

    return (
        <div className='apartment-card'>
            <ApartmentsSlider
                images={photos}
                title={title}
                onClick={() => {
                    navigate(`/apartments/${id}`)
                    vibrationCallback()
                }}
            />

            <div className='apartment-card__info'>
                <Link
                    to={`/apartments/${id}`}
                    className='apartment-card__title'
                    onClick={vibrationCallback}
                >
                    {title}
                </Link>
                <p className='apartment-card__location'>
                    <EnvironmentFilled className='apartment-card__icon' />
                    {location ? location : 'Не указано'}
                </p>
                {/*<p className='apartment-card__bedrooms'>*/}
                {/*    <HomeFilled className='apartment-card__icon' />*/}
                {/*    {bedrooms} {'спальни'}: {area} {'m'} <sup>2</sup>*/}
                {/*</p>*/}
                <div className='apartment-card__footer'>
                    {price ? (
                        <p className='apartment-card__footer__price'>{amountFormat(price)}</p>
                    ) : (
                        <>
                    {priceFrom && !priceTo && (
                        <p className='apartment-card__footer__price'>от {amountFormat(priceFrom)}</p>
                    )}

                    {!priceFrom && priceTo && (
                        <p className='apartment-card__footer__price'>до {amountFormat(priceTo)}</p>
                    )}

                    {priceFrom && priceTo && (
                        <p className='apartment-card__footer__price_double'>
                            <span>от {amountFormat(priceFrom)}</span>
                            <span>до {amountFormat(priceTo)}</span>
                        </p>
                    )}
                        </>
                    )}

                    {!priceFrom && !priceTo && !price && (
                        <p className='apartment-card__footer__price'>{'Цена по запросу'}</p>
                    )}

                    <Button
                        className='apartment-card__footer__btn'
                        Component='a'
                        href={managerLink}
                        loading={!managerLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {'Написать'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ApartmentCard;
