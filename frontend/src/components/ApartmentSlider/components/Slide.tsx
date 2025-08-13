import { useState } from "react";
import { useSwiperSlide } from 'swiper/react';
import classnames from "classnames";

const loadedSliderImages = new Set()

const Slide = ({ title, image, index }: { title: string, image: string, index: number }) => {
  const [isLoading, setIsLoading] = useState(() => !loadedSliderImages.has(image))
  const { isActive } = useSwiperSlide();

  const imgProps = (isActive || !isLoading) ? { src: image } : { 'data-src': image }

  return (
    <img
      {...imgProps}
      className={classnames('apartment-slider__image', !isLoading && 'apartment-slider__image_show')}
      alt={`${title} - фото ${index + 1}`}
      onLoad={() => {
        loadedSliderImages.add(image);
        setIsLoading(false)
      }}
      loading='lazy'
    />
  )
}

export default Slide
