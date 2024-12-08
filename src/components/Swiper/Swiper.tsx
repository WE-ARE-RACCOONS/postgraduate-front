import React from 'react';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import Image from 'next/image';
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
          src="/banner1.png"
          alt="대학원 김선배의 첫번째 배너 이미지"
          aria-label="대학원 김선배의 첫번째 배너 이미지"
          width={328}
          height={107}
          priority
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/banner2.png"
          alt="대학원 김선배의 두번째 배너 이미지"
          aria-label="대학원 김선배의 두번째 배너 이미지"
          width={328}
          height={107}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/banner3.png"
          alt="대학원 김선배의 두번째 배너 이미지"
          aria-label="대학원 김선배의 두번째 배너 이미지"
          width={328}
          height={107}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
