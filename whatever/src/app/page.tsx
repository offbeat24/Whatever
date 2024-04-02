export default function Home() {
  return (
    <main className='absolute top-0 left-0 w-full'>
      <div className='flex flex-col h-screen'>
        <section className='h-3/5  bg-custom-image bg-cover bg-center relative ' >
          <div className ='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50' />
        </section>
        <section className='h-2/5'>
        오늘은 뭐 먹지? 더 이상 고민하지 마세요!
        </ section>
      </div>
    </main>
  );
}
