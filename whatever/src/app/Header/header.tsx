import ContactBtn from './components/ContactBtn';
import HomeBtn from './components/HomeBtn';

export default function Header() {
  return (
    <header className="relative bg-transparent flex items-center justify-center">
      <nav className="flex justify-between items-center w-full laptop:p-[1.5rem] tablet-l:p-[1.25rem] z-10">
        <div className="flex-1 flex justify-start">
          {/* 왼쪽 여백을 차지하는 빈 div */}
        </div>
        <div className="flex-1 flex justify-center">
          <HomeBtn />
        </div>
        <div className="flex-1 flex justify-end">
          <ContactBtn />
        </div>
      </nav>
    </header>
  );
}
