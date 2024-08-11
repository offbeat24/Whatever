import Link from 'next/link';
import Image from 'next/image';

export default function ContactBtn() {
  return (
    <Link href="/contact" className="flex items-center laptop:w-[2.5rem] tablet-l:w-[2rem]">
      <Image
        src="/Contact.svg"
        alt="Contact"
        width={56}
        height={56}
        className="object-contain w-full"
      />
    </Link>
  );
}
