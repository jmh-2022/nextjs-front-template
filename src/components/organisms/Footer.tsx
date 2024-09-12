'use client';
import React from 'react';
import { DivRow } from '../atoms';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FooterItem = ({ title, url, currentPath }: { title: string; url: string; currentPath: string }) => {
  console.log(currentPath);
  return (
    <Link
      href={url}
      className={`flex flex-col items-center justify-between font-medium text-xs ${
        currentPath.indexOf(url) > -1 ? 'text-white' : 'text-gray-400'
      }`}
    >
      <p>*</p>
      <p className="">{title}</p>
    </Link>
  );
};

export default function Footer() {
  const pathname = usePathname();

  return (
    <DivRow className="text-white font-roboto h-[90px] bg-[#262626] border-t border-white/50 shadow-[0px_-4px_4px_0px_rgba(102, 102, 102, 0.12)] items-center justify-center px-9">
      <DivRow className="justify-between w-full h-14">
        <FooterItem title="매거진" url="/magazine" currentPath={pathname} />
        <FooterItem title="인사이트" url="/insight" currentPath={pathname} />
        <FooterItem title="내일앱" url="#" currentPath={pathname} />
        <FooterItem title="상품" url="/product" currentPath={pathname} />
        <FooterItem title="공지" url="/notices" currentPath={pathname} />
      </DivRow>
    </DivRow>
  );
}
