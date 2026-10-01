import Image, { type ImageProps } from 'next/image';
import type { ButtonHTMLAttributes } from 'react';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children' | 'type'> & {
  label: string;
  type: 'button' | 'submit';
  src: ImageProps['src'];
  imageWidth: number;
  imageHeight: number;
  imageClassName: string;
};

export default function IconButton({
  label,
  src,
  imageWidth,
  imageHeight,
  imageClassName,
  type,
  ...buttonProps
}: IconButtonProps) {
  return (
    <button type={type === 'submit' ? 'submit' : 'button'} aria-label={label} {...buttonProps}>
      <Image src={src} alt="" width={imageWidth} height={imageHeight} className={imageClassName} />
    </button>
  );
}
