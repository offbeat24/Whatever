import Link from 'next/link';
import Image from 'next/image';
import usedCSVData from '../hooks/usedCSVData';
import Roulette from './components/roulette';
import Header from './Header/header';
import DLogo from '../../public/3D_Logo.png'

export default async function Home() {

  const foodList = await usedCSVData();
  
  return (
    <>
      <Header />
      <main className='absolute top-0 left-0 w-full'>
        <div className='flex flex-col h-screen'>
          <section className='laptop:h-[35rem] tablet-l:h-[35rem] tablet:h-[48rem] mobile:h-[26.25rem] bg-custom-image bg-cover bg-center relative flex items-center justify-center' >
            <div className ='w-full h-full laptop:text-[4.375rem] tablet-l:text-[3.5rem] tablet:text-[2.5rem] mobile:text-[1.25rem] font-extrabold bg-black bg-opacity-50 flex flex-col items-center justify-center'>
              <div className='flex flex-col items-center laptop:flex-row laptop:justify-between laptop:space-x-28 tablet-l:flex-row tablet-l:justify-between tablet-l:space-x-11 tablet:space-y-3 mobile:space-y-3'>
                <div className='order-2 laptop:space-y laptop:order-1 tablet-l:order-1 [text-shadow:0px_1.6px_1.6px_rgba(0,0,0,0.25),0px_4px_8px_rgba(0,0,0,0.25)] flex flex-col my-auto text-center tablet-l:text-left laptop:text-left'> 
                  <p className='text-white'>오늘은 뭐 먹지?</p>
                  <p className='text-white'>더 이상 고민하지 마세요!</p>
                </div>
                <Image src={DLogo} alt='' className='drop-shadow-lg order-1 laptop:order-2 tablet-l:order-2 laptop:w-[15.875rem] tablet-l:w-[12.5rem] tablet:w-[18rem] mobile:w-[10rem]'/>
                
              </div>
            </div>
          </section>
          <section className='flex flex-col justify-center items-center text-center laptop:my-16 tablet-l:my-16 tablet:my-16 mobile:my-5'>
            <article className='flex text-black font-extrabold items-start align-middle laptop:text-[3.75rem] tablet-l:text-[3rem] tablet:text-[2.8125rem] mobile:text-[1.5625rem]'>
              <p className='my-auto'>오늘은</p>
              <div className='laptop:w-[35rem] laptop:h-[6rem] tablet-l:w-[30rem] tablet-l:h-[5rem] tablet:w-[24rem] tablet:h-[4.5rem] mobile:w-[12rem] mobile:h-[2.5rem] bg-snow rounded-full content-around shadow-xl mx-8 mobile:mx-3'>
                <Roulette textData={foodList} dataFromMap={undefined}/>
              </div>
              <p className='my-auto'>먹자!</p>
            </article>
          </section>
          <Link href="/random">
            <section className='flex laptop:h-[3.5rem] tablet-l:h-[3rem] tablet:h-[2.5rem] mobile:h-[2.5rem] laptop:text-[1.8rem] tablet-l:text-[1.25rem] tablet:text-[1.25rem] mobile:text-[1rem] text-white bg-orange-o2 justify-center items-center text-center fixed bottom-0 left-0 w-full'>
              <p className='font-pretendard font-extrabold'>메뉴 고르기</p>
            </section>
          </Link>
        </div>
      </main>
    </>
    
  );
}
