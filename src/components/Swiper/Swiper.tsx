import React from 'react';
import 'swiper/css/bundle'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Img } from './Swiper.styled';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


const SwiperComponent = () => {
    SwiperCore.use([Navigation, Pagination, Autoplay]);
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }} 
      style={{ height: '6.7rem'}}
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
