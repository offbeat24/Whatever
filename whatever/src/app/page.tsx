import Link from 'next/link';
import usedCSVData from '../hooks/usedCSVData';
import Card from './components/card';
import Roulette from './components/roulette';

export default async function Home() {

  const foodList = await usedCSVData();
  
  return (
    <main className='absolute top-0 left-0 w-full'>
      <div className='flex flex-col h-screen'>
        <section className='h-[648px]  bg-custom-image bg-cover bg-center relative ' >
          <div className ='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='grid grid-cols-4 justify-items-center gap-x-[33px]'>
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </section>
        <section className='h-2/5 bg-stone-200 font-pretendard flex flex-col justify-center items-center text-center'>
          <p className='text-4xl'>오늘은 뭐 먹지? 더 이상 고민하지 마세요!</p>
          <article className='flex font-extrabold text-7xl items-center my-8'>
            <p>오늘은</p>
            <div className='w-[510px] h-24 rounded-full content-around shadow-xl mx-8'>
              <Roulette textData={foodList}/>
            </div>
            <p>먹자!</p>
          </article>
        </ section>
        <Link href="/RandomOnMap">
          <section className='flex h-[86px] bg-[#FFA114] justify-center items-center text-center'>
            <p className='font-pretendard font-extrabold text-3xl'>메뉴 고르기</p>
          </section>
        </Link>
      </div>
    </main>
  );
}
