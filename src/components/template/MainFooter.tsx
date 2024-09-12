import React from 'react';
import { MainColumn } from '../atoms';
import Footer from '../organisms/Footer';

export default function MainFooter({ children }: ComponentChildren) {
  return (
    <>
      <MainColumn className="overflow-y-auto">{children}</MainColumn>
      <Footer />
    </>
  );
}
