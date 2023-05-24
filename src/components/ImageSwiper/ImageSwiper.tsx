import React from 'react';
import styled from 'styled-components';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation, Pagination, A11y, Scrollbar } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type IImage = {
  src: string;
  alt: string;
};

interface ImageSwiperProps {
  images: (IImage | undefined)[];
  style?: React.CSSProperties;
}

export function ImageSwiper({ images, style }: ImageSwiperProps) {
  return (
    <StyledSwiper
      style={style}
      modules={[Navigation, Pagination, A11y, Scrollbar]}
      slidesPerView={1}
      pagination={{
        clickable: true,
        bulletElement: 'button',
      }}
      navigation={true}
    >
      {images.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <StyledSwiperSlideImg src={image?.src} alt={image?.alt} />
          </SwiperSlide>
        );
      })}
    </StyledSwiper>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 674px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .swiper-pagination-bullet {
    background-color: rgba(#fff, 0.7);
  }

  .swiper-pagination-bullet-active {
    background-color: white;
    box-shadow: 0 0 5px 3px rgba(255, 187, 0, 0.5);
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 41.67px;
    height: 43.06px;
    border-radius: 50%;
    position: absolute;
  }

  .swiper-button-prev {
    background: url('/prev.png') no-repeat;
    background-position: center top;
    left: 25.82px;
  }

  .swiper-button-next {
    background: url('/next.png') no-repeat;
    background-position: center top;
    right: 25.82px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;

const StyledSwiperSlideImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
