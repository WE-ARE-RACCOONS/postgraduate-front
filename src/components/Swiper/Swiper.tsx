import React from 'react';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import Image from 'next/image';
import Banner1 from '../../../public/banner1.png';
import Banner2 from '../../../public/banner2.png';
import Banner3 from '../../../public/banner3.png';
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
        <Image
          src={Banner1}
          alt="대학원 김선배의 첫번째 배너 이미지"
          aria-label="대학원 김선배의 첫번째 배너 이미지"
          width={328}
          loading="lazy"
          height={107}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={Banner2}
          alt="대학원 김선배의 두번째 배너 이미지"
          aria-label="대학원 김선배의 두번째 배너 이미지"
          width={328}
          loading="lazy"
          height={107}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={Banner3}
          alt="대학원 김선배의 두번째 배너 이미지"
          aria-label="대학원 김선배의 두번째 배너 이미지"
          width={328}
          loading="lazy"
          height={107}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
