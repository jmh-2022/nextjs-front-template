'use client';

import { DivColumn } from '@/components/atoms';
import { Title1 } from '@/components/atoms/Texts';
import MainFooter from '@/components/template/MainFooter';
import React from 'react';

// Import Swiper styles

// Autoplay 모듈을 사용하기 위해 Swiper의 modules에 추가

export default function Page() {
  return (
    <MainFooter>
      <Title1>매거진 메인</Title1>
      <DivColumn>이벤트</DivColumn>
    </MainFooter>
  );
}
