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
  height: 100%;
`;

const StyledSwiperSlideImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;
