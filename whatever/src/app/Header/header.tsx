import ContactBtn from './components/ContactBtn';
import HomeBtn from './components/HomeBtn';

export default function Header() {
  return (
    <header className='relative h-[126px] bg-transparent content-center'>
      <div className='relative z-10'>
        <nav className='flex justify-between items-center px-9 justify-items-center'>
          <div className='w-14'/>
          <HomeBtn />
          <ContactBtn />
        </nav>
      </div>
    </header>
  );
}
