import FoodMap from './components/map';

export default function RandomPage () {
  return(
    <main className='absolute top-0 left-0 w-full'>
      <div className='flex flex-col h-screen'>
        <div className='h-[378px]  bg-custom-image bg-cover bg-center relative flex justify-center items-center' >
          <div className ='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' />
          <section className='w-[1650px] h-[880px] flex justify-center items-center'>
            <FoodMap />
          </section>
        </div>
      </div>
    </main>
  )
}