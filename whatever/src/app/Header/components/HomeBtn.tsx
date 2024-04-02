import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../../public/Logo_new_text.svg';

export default function HomeBtn() {
  return (
    <Link href="/" className=''>
      <Image src={Logo} alt='Logo' width={208} height={56} className='justify-self-center'/>
    </Link>
  );
};