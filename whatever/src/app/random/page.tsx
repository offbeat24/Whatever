import FoodMap from './components/map';
import Navigation from './components/gnb';

export default function RandomPage () {
  return(
    <section className='fixed inset-0 flex items-center justify-center'>
      <Navigation />
      <div className='flex-grow' >
        <FoodMap />
      </div>
    </section>
  )
}