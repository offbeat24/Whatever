import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ListContent from './ListContent';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string | null) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
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
    <div className="relative">
      {/* 메뉴 컨테이너 */}
      <div className="fixed inset-0 z-20 pointer-events-none scrollbar-hide">
        <AnimatePresence>
          {activeMenu && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 pointer-events-auto "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />
              {/* 사이드바 (laptop) */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={sidebarVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-[4.5rem] w-96 h-full bg-white hidden laptop:block pointer-events-auto shadow-[15px_0px_25px_0px_rgba(0,0,0,0.15)]"
              >
                {activeMenu && <ListContent type={activeMenu} />} 
              </motion.div>

              {/* 하단 네비게이션 (모바일 및 태블릿) */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={bottomNavVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 w-full h-[300px] bg-white shadow-[0px_-15px_14px_0px_rgba(0,0,0,0.15)] block laptop:hidden pointer-events-auto"
              >
                <button type="button" onClick={() => setActiveMenu(null)} className="absolute top-4 right-4">
                  Close
                </button>
                {activeMenu && <ListContent type={activeMenu} />} 
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 네비게이션 */}
      <nav className={`fixed laptop:top-0 laptop:left-0 laptop:h-full laptop:w-[4.6875rem] ${!activeMenu ? 'laptop:shadow-[15px_0px_25px_0px_rgba(0,0,0,0.15)]' : ''} laptop:flex-col laptop:justify-start
      h-[3.125rem] scrollbar-hide ${!activeMenu ? 'tablet:shadow-[0px_-15px_14px_0px_rgba(0,0,0,0.15)]' : ''}
      flex-row bottom-0 left-0 w-full bg-orange-o3 z-30 flex justify-between items-center`}>
        <Link href="/" className='hidden laptop:block'>
        <div className='flex laptop:w-[4.6975rem] laptop:h-[5.9375rem] border-b-white border-b border-solid justify-center items-center'>
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
      {['search', 'bookmark', 'history'].map((menu) => (
        <button
          key={menu}
          type="button"
          className={`flex laptop:h-[5.9375rem] w-full h-full laptop:border-b-white laptop:border-b border-solid justify-center items-center cursor-pointer ${activeMenu === menu ? 'bg-white' : ''}`}
          onClick={() => handleMenuClick(menu)}
        >
          <div className={`laptop:w-11 tablet:w-[2.25rem] ${activeMenu === menu ? 'text-orange-o3' : ''}`}>
            <Image
              src={activeMenu === menu ? `/${`${menu.charAt(0).toUpperCase() + menu.slice(1) }Text`}_activate.svg` : `/${`${menu.charAt(0).toUpperCase() + menu.slice(1) }Text`}.svg`}
              alt={menu}
              layout="responsive"
              width={44}
              height={44}
              className="object-contain w-full"
            />
          </div>
        </button>
      ))}
      </nav>
    </div>
  );
}

