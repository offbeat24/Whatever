import Link from 'next/link';
import Image from 'next/image';
import LogoFull from '../../../public/Logo_Full.svg'
export default function Header() {
  return (
    <>
      <Link href="/">
        <Image 
          src={LogoFull} 
          alt=''
          width={196}
        />
      </Link>
      <div>메뉴</div>
    </>
  )
} 