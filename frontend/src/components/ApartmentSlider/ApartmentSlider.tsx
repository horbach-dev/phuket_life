import { useId, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import classnames from 'classnames';
import Spinner from '@/components/Spinner'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ApartmentSlider.scss';

interface IProps {
    images: string[];
    title: string;
    radius?: boolean;
    onClick?: () => void
}

const ApartmentSlider = ({ images, title, radius = true, onClick }: IProps) => {
    const cardId = useId().replace(/:/g, '-');

  return (
    <div className={classnames('apartment-slider', radius && 'apartment-slider_radius')}>
        {images.length ? (
                <>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: `.apartment-slider__button_prev_${cardId}`,
                        nextEl: `.apartment-slider__button_next_${cardId}`,
                    }}
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                >
                    {images.map((image, index) => (
                        <SwiperSlide
                            key={image}
                            onClick={onClick}
                            className='apartment-slider__item'
                        >
                        <Slide
                            title={title}
                            image={image}
                            index={index}
                        />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {images.length > 1 && (
                    <>
                        <button className={`apartment-slider__button apartment-slider__button_prev apartment-slider__button_prev_${cardId}`} />
                        <button className={`apartment-slider__button apartment-slider__button_next apartment-slider__button_next_${cardId}`} />
                    </>
                )}
                </>
        ) : (
            <div className="apartment-slider__empty" onClick={onClick}></div>
        )}
    </div>
  );
};

const Slide = ({ title, image, index }: any) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
        <Spinner className={!isLoading ? 'hide' : ''} />
        <img
                src={image}
                className={classnames('apartment-slider__image', !isLoading && 'apartment-slider__image_show')}
                alt={`${title} - фото ${index + 1}`}
                onLoad={() => setIsLoading(false)}
            />
        </>
    )
}

export default ApartmentSlider;
