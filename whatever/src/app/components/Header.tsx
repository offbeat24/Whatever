import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/아무거나.svg'
export default function Header() {
  return (
    <>
      <Link href="/">
        <Image 
          src={Logo} 
          alt=''
          width={196}
        />
      </Link>
      <div>메뉴</div>
    </>
  )
} 