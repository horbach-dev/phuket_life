import {useState} from "react";
import { useSwiperSlide } from 'swiper/react';
import classnames from "classnames";

const Slide = ({ title, image, index }: { title: string, image: string, index: number }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { isActive } = useSwiperSlide();

  const imgProps = (isActive || !isLoading) ? { src: image } : { datasrc: image }

  return (
    <img
      {...imgProps}
      className={classnames('apartment-slider__image', !isLoading && 'apartment-slider__image_show')}
      alt={`${title} - фото ${index + 1}`}
      onLoad={() => setIsLoading(false)}
      loading='lazy'
    />
  )
}

export default Slide
