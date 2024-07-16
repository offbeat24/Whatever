import HomeBtn from './components/HomeBtn';

export default function Header() {
  return (
    <header className="relative bg-transparent flex items-center justify-center">
      <nav className="flex justify-between items-center w-full laptop:p-[1.5rem] tablet-l:p-[1.25rem] z-10">
        <div className="flex-1 flex justify-center">
          <HomeBtn />
        </div>
      </nav>
    </header>
  );
}
