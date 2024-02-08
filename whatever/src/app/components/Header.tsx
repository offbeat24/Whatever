import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '../../../public/Logo_Icon.svg'
export default function Header() {
  return (
    <>
      <Link href="/">
        <Image 
          src={LogoIcon} 
          alt=''
          width={196}
        />
      </Link>
      <div>메뉴</div>
    </>
  )
} 