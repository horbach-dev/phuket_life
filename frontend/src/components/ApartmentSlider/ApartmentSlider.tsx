import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import classnames from 'classnames';
import Slide from './components/Slide'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ApartmentSlider.scss';

interface IProps {
  images: string[];
  title: string;
  radius?: boolean;
  onClick?: () => void
  id: string
}

const ApartmentSlider = ({ id, images, title, radius = true, onClick }: IProps) => {
  return (
    <div className={classnames('apartment-slider', radius && 'apartment-slider_radius')}>
        {images.length ? (
                <>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                      prevEl: `.apartment-slider__button_prev_${id}`,
                      nextEl: `.apartment-slider__button_next_${id}`,
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
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
                    <div className='apartment-slider__skeleton-shadow'/>
                  </Swiper>
                  {images.length > 1 && (
                    <>
                        <button className={`apartment-slider__button apartment-slider__button_prev apartment-slider__button_prev_${id}`} />
                        <button className={`apartment-slider__button apartment-slider__button_next apartment-slider__button_next_${id}`} />
                    </>
                )}
                </>
        ) : (
            <div className="apartment-slider__empty" onClick={onClick}></div>
        )}
    </div>
  );
};

export default ApartmentSlider;
