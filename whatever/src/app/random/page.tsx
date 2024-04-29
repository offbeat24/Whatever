import FoodMap from './components/map';

export default function RandomPage () {
  return(
    <main className='relative w-full'>
      <div className='fixed top-0 left-0 w-full h-[378px] bg-custom-image bg-cover bg-center' >
        <div className ='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' />
      </div>
      <section className='fixed inset-0 flex items-center justify-center z-20'>
        <FoodMap />
      </section>
    </main>
  )
}