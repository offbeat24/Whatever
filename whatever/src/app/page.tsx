import Roulette from './components/roulette';

export default function Home() {
  return (
    <main className='absolute top-0 left-0 w-full'>
      <div className='flex flex-col h-screen'>
        <section className='h-3/5  bg-custom-image bg-cover bg-center relative ' >
          <div className ='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50' />
        </section>
        <section className='h-2/5 bg-stone-200 font-pretendard flex flex-col justify-center items-center text-center'>
          <p className='text-4xl'>오늘은 뭐 먹지? 더 이상 고민하지 마세요!</p>
          <article className='flex font-extrabold text-7xl items-center my-8'>
            <p>오늘은</p>
            <div className='w-96 h-24 rounded-full shadow-xl mx-8'>
              <Roulette />
            </div>
            <p>먹자!</p>
          </article>
        </ section>
      </div>
    </main>
  );
}
