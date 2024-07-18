import Link from 'next/link';
import Image from 'next/image';


export default function HomeBtn() {
  return (
    <Link href="/" className='flex justify-center items-center laptop:w-[10.625rem] tablet-l:w-[8.5rem] tablet:w-[11rem] mobile:w-[6.5rem]'>
      <Image
        src='/Logo_new_text.svg'
        alt="Logo"
        layout="responsive"
        width={210}
        height={60}
        className="object-contain w-full"
      />
    </Link>
  );
};