import Link from 'next/link';
import usedCSVData from '../hooks/usedCSVData';
import Roulette from './components/roulette';
import Header from './Header/header';

export default async function Home() {

  const foodList = await usedCSVData();
  
  return (
    <>
      <Header />
      <main className='absolute top-0 left-0 w-full'>
        <div className='flex flex-col h-screen'>
          <section className='h-[67vh]  bg-custom-image bg-cover bg-center relative ' >
            <div className ='absolute top-0 left-0 w-full h-full text-[4.375rem] font-extrabold bg-black bg-opacity-50 flex-col justify-center items-start'>
              <p className='text-white'>오늘은 뭐 먹지?</p>
              <p className='text-white'>더 이상 고민하지 마세요!</p>
            </div>
          </section>
          <section className='h-2/5 bg-white font-pretendard flex flex-col justify-center items-center text-center'>
            <article className='flex-col  text-black font-extrabold text-7xl items-start my-8  '>
              <p>오늘은</p>
              <div className='w-[510px] h-24  bg-white rounded-full content-around shadow-xl mx-8'>
                <Roulette textData={foodList}/>
              </div>
              <p>먹자!</p>
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
