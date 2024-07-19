"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  const sidebarVariants = {
    open: { x: 0},
    closed: { x: '-100%' },
  };

  const bottomNavVariants = {
    open: { y: 0 },
    closed: { y: '100%' },
  }
  return (
    <nav className="fixed laptop:top-0 laptop:left-0 laptop:h-full laptop:w-[4.6875rem] laptop:bg-orange-o3 laptop:shadow-[15px_0px_25px_0px_rgba(0,0,0,0.15)] laptop:z-10
    bottom-0 left-0 w-full h-16 bg-orange-o3 z-10 flex laptop:flex-col justify-start items-center">
      <Link href="/">
        <div className='flex laptop:w-[4.6975rem] laptop:h-[5.9375rem] border-b-neutral-50 border-b border-solid justify-center items-center'>
          <div className='laptop:w-[3.125rem]'>
            <Image
              src='/logo_vertical.svg'
              alt="logo"
              layout="responsive"
              width={50}
              height={32}
              className="object-contain w-full"
            />
          </div>
        </div>
      </Link>
      <div className='flex laptop:w-[4.6975rem] laptop:h-[5.9375rem] border-b-neutral-50 border-b border-solid justify-center items-center'>
        <div className='laptop:w-11'>
          <Image
            src='/SearchText.svg'
            alt="search"
            layout="responsive"
            width={44}
            height={44}
            className="object-contain w-full"
          />
        </div>
      </div>
      <div className='flex laptop:w-[4.6975rem] laptop:h-[5.9375rem] border-b-neutral-50 border-b border-solid justify-center items-center'>
        <div className='laptop:w-11'>
          <Image
            src='/Bookmark.svg'
            alt="bookmark"
            layout="responsive"
            width={44}
            height={44}
            className="object-contain w-full"
          />
        </div>
      </div>
      <div className='flex laptop:w-[4.6975rem] laptop:h-[5.9375rem] border-b-neutral-50 border-b border-solid justify-center items-center'>
        <div className='laptop:w-[2.625rem]'>
          <Image
            src='/HistoryText.svg'
            alt="history"
            layout="responsive"
            width={41}
            height={45}
            className="object-contain w-full"
          />
        </div>
      </div>
    </nav>
  );
}

