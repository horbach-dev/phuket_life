import { Button } from '@telegram-apps/telegram-ui';

import './ApartmentCard.scss';

export const ApartmentCardSkeleton = () => {
    return (
        <div className="apartment-card apartment-card_skeleton">
            <div className="apartment-slider">
                <div className='apartment-slider__skeleton-shadow' />
            </div>
            <div className='apartment-card__info'>
                <div className="apartment-card__title">
                    <div className='apartment-slider__skeleton-shadow' />
                    <span>0</span>
                </div>
                <div className="apartment-card__location">
                    <div className='apartment-slider__skeleton-shadow' />
                    <span>0</span>
                </div>
                <div className="apartment-card__bedrooms">
                    <span>0</span>
                </div>
                <div className="apartment-card__footer">
                    <div className='apartment-card__footer__price'>
                        <div className='apartment-slider__skeleton-shadow' />
                        <span>000000000000</span>
                    </div>
                    <Button disabled className='apartment-card__footer__btn'><span>00000</span></Button>
                </div>
            </div>
        </div>
    )
}