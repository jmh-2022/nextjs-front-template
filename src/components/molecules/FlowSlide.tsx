import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Div, DivColumn } from '../atoms';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CustomSwiper.css';

export default function FlowSlide() {
  return (
    <Div className="border">
      <p>흐르는 슬라이드</p>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={2000}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className=" ">
          <DivColumn className="h-28 items-center justify-center  text-5xl relative">
            <Div className="absolute animate-top-bottom">😜</Div>
          </DivColumn>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <DivColumn className="h-28 items-center justify-center  text-5xl relative">
            <Div className="absolute animate-bottom-top">😝</Div>
          </DivColumn>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <DivColumn className="h-28 items-center justify-center  text-5xl relative">
            <Div className="absolute animate-top-bottom">🤪</Div>
          </DivColumn>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <DivColumn className="h-28 items-center justify-center  text-5xl relative">
            <Div className="absolute animate-bottom-top">😋</Div>
          </DivColumn>
        </SwiperSlide>
      </Swiper>
    </Div>
  );
}
