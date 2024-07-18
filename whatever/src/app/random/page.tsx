import FoodMap from './components/map';
import Navigation from './components/gnb';

export default function RandomPage () {
  return(
    <section className='fixed inset-0 flex flex-col laptop:flex-row'>
      <Navigation />
      <div className='flex-grow laptop:ml-[4.6875rem]' >
        <FoodMap />
      </div>
    </section>
  )
}