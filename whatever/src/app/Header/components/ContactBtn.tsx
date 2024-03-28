import Image from 'next/image';
import Link from 'next/link';
import Contact from '../../../../public/Contact.svg';

export default function ContactBtn() {
  return (
    <Link href="/" className="flex items-center">
      <Image src={Contact} alt='Contact' width={56} height={56} />
    </Link>
  );
};

// 모달 만들어야해 
