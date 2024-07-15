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
          <section className='h-[67vh]  bg-custom-image bg-cover bg-center relative flex items-center justify-center' >
            <div className ='w-full h-full laptop:text-[4.375rem] tablet-l:text-[3.125rem] tablet:text-[2.5rem] mobile:text-[1.25rem] font-extrabold bg-black bg-opacity-50 flex flex-col laptop:flex-row items-center justify-center'>
              <div className='flex flex-col items-center laptop:flex-row laptop:justify-between laptop:space-x-28'>
                <div className='order-2 laptop:order-1 flex flex-col my-auto text-center laptop:text-left'> 
                  <p className='text-white'>오늘은 뭐 먹지?</p>
                  <p className='text-white'>더 이상 고민하지 마세요!</p>
                </div>
                <Image src={DLogo} alt='' className='order-1 laptop:order-2 laptop:w-[15.875rem] tablet-l:w-[21.25rem] tablet:w-[18rem] mobile:w-[10rem]'/>
                
              </div>
            </div>
          </section>
          <section className='h-2/5 bg-white font-pretendard flex flex-col justify-center items-center text-center'>
            <article className='flex text-black font-extrabold items-start my-8 align-middle laptop:text-[3.75rem] tablet-l:text-[3.4375rem] tablet:text-[2.8125rem] mobile:text-[1.5625rem]'>
              <p className='my-auto'>오늘은</p>
              <div className='laptop:w-[35rem] laptop:h-[6rem] tablet-l:w-[30rem] tablet-l:h-[5rem] tablet:w-[24rem] tablet:h-[4.5rem] mobile:w-[11.25rem] mobile:h-[2.5rem] bg-white rounded-full content-around shadow-xl mx-8'>
                <Roulette textData={foodList}/>
              </div>
              <p className='my-auto'>먹자!</p>
            </article>
          </section>
          <Link href="/random">
            <section className='flex h-[6.25vh] text-white bg-orange-o2 justify-center items-center text-center'>
              <p className='font-pretendard font-extrabold text-3xl'>메뉴 고르기</p>
            </section>
          </Link>
        </div>
      </main>
    </>
    
  );
}
