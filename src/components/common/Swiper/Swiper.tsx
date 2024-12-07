import React from 'react';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Img } from './Swiper.styled';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const SwiperComponent = () => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      style={{
        height: '6.7rem',
        borderRadius: '1rem',
      }}
    >
      <SwiperSlide>
        <Img src="/banner1.png" alt="Image 1" />
      </SwiperSlide>
      <SwiperSlide>
        <Img src="/banner2.png" alt="Image 2" />
      </SwiperSlide>
      <SwiperSlide>
        <Img src="/banner3.png" alt="Image 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
