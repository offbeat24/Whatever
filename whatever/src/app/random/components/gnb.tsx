"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string | null) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  const bottomNavVariants = {
    open: { y: 0 },
    closed: { y: '100%' },
  }
  return (
    <nav className="fixed laptop:top-0 laptop:left-0 laptop:h-full laptop:w-[4.6875rem] laptop:shadow-[15px_0px_25px_0px_rgba(0,0,0,0.15)] laptop:flex-col laptop:justify-start
    tablet:h-3.125rem tablet:[filter:drop-shadow(2px_2px_10px_rgba(0,0,0,0.25))]
    flex-row bottom-0 left-0 w-full bg-orange-o3 z-30 flex justify-between items-center">
      <Link href="/" className='hidden laptop:block'>
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
      <button
        type="button"
        className={`flex laptop:w-[4.6875rem] laptop:h-[5.9375rem] w-full laptop:border-b-neutral-50 laptop:border-b laptop:border-r-0 border-r-neutral-50 border-r border-solid justify-center items-center cursor-pointer ${activeMenu === 'search' ? 'bg-white' : ''}`}
        onClick={() => handleMenuClick('search')}
      >
        <div className={`laptop:w-11 tablet:w-[2.25rem] ${activeMenu === 'search' ? 'text-orange-o3' : ''}`}>
          <Image
            src='/SearchText.svg'
            alt="search"
            layout="responsive"
            width={44}
            height={44}
            className="object-contain w-full"
          />
        </div>
      </button>
      <button
        type="button"
        className={`flex laptop:w-[4.6875rem] laptop:h-[5.9375rem] w-full laptop:border-b-neutral-50 laptop:border-b laptop:border-r-0 border-r-neutral-50 border-r border-solid justify-center items-center cursor-pointer ${activeMenu === 'bookmark' ? 'bg-fafafa' : ''}`}
        onClick={() => handleMenuClick('bookmark')}
      >
        <div className={`laptop:w-11 tablet:w-[2.25rem] ${activeMenu === 'bookmark' ? 'text-orange-o3' : ''}`}>
          <Image
            src='/Bookmark.svg'
            alt="bookmark"
            layout="responsive"
            width={44}
            height={44}
            className="object-contain w-full"
          />
        </div>
      </button>
      <button
        type="button"
        className={`flex laptop:w-[4.6875rem] laptop:h-[5.9375rem] w-full laptop:border-b-neutral-50 laptop:border-b laptop:border-r-0 border-solid justify-center items-center cursor-pointer ${activeMenu === 'history' ? 'bg-fafafa' : ''}`}
        onClick={() => handleMenuClick('history')}
      >
        <div className={`laptop:w-[2.625rem] tablet:w-[2.25rem] ${activeMenu === 'history' ? 'text-orange-o3' : ''}`}>
          <Image
            src='/HistoryText.svg'
            alt="history"
            layout="responsive"
            width={41}
            height={45}
            className="object-contain w-full"
          />
        </div>
      </button>

      <AnimatePresence>
        {
          activeMenu && (
            <>
            {/* {사이드바 (laptop)} */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-[4.5rem] w-96 h-full z-10 bg-white shadow-lg hidden laptop:block"
              >
                <button
                  type="button"
                  onClick={()=> setActiveMenu(null)} className="absolute top-4 right-4">
                    Close
                </button>
                {activeMenu === 'search' && <div>Search Content</div>}
                {activeMenu === 'bookmark' && <div>Bookmark Content</div>}
                {activeMenu === 'history' && <div>History Content</div>}  
              </motion.div>

              {/* 하단 네비게이션 (모바일 및 태블릿) */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={bottomNavVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 w-full h-[300px] z-10 bg-white shadow-lg block laptop:hidden"
              >
                <button type="button" onClick={() => setActiveMenu(null)} className="absolute top-4 right-4">
                  Close
                </button>
                {activeMenu === 'search' && <div>Search Content</div>}
                {activeMenu === 'bookmark' && <div>Bookmark Content</div>}
                {activeMenu === 'history' && <div>History Content</div>}
              </motion.div>
            </>
          )
        }
      </AnimatePresence>
    </nav>
  );
}

