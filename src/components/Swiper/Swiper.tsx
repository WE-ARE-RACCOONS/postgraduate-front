import React from 'react';
import 'swiper/css/bundle'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Img } from './Swiper.styled';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SwiperComponent = () => {
    SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={false}
      style={{ height: '100%'}}
    >
      <SwiperSlide>
        <Img src="/racoon1.png" alt="Image 1" />
      </SwiperSlide>
      <SwiperSlide>
        <Img src="/racoon2.png"alt="Image 2" />
      </SwiperSlide>
      <SwiperSlide>
        <Img src="/racoon3.png"alt="Image 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
