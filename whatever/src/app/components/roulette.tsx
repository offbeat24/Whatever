"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ShuffleIcon from '../../../public/Shuffle.svg'; 

interface Props {
  textData : string[],
}

interface VariantProps {
  scaleY: number;
  y: string | number;
  opacity: number;
  filter?: string;
}

export default function Roulette({textData }: Props): JSX.Element {
  // const [textListIndex, setTextListIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = textData.length - 1 - count;
  const buttonColor = 'rgb(75, 85, 99)';

  function getDuration(base: number, index: number) {
    return base * (index + 1) * 0.5;
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev < lastIndex ? prev + 1 : prev);
    }, getDuration(15, currentIndex));

    return () => clearInterval(interval);
  }, [currentIndex, lastIndex, count]);

  function handleClick() {
    setCurrentIndex(0);
    setCount((prev) => prev < textData.length - 1 ? prev + 1 : 0);
  }

  const variants: Variants = {
    initial: { scaleY: 0.3, y: '-50%', opacity: 0 },
    animate: ({ isLast }) => {
      const props: VariantProps = { scaleY: 1, y: 0, opacity: 1 };
      if (!isLast) props.filter = 'blur(1.5px)';

      return props;
    },
    exit: { scaleY: 0.3, y: '50%', opacity: 0 },
  };


  return(
    <div className='justify-items-center'>
      <AnimatePresence mode="popLayout">
        {textData.map((item, i) => {
          const isLast = i === textData.length - 1;

          return (
            i === currentIndex && (
              <motion.p
                className="overflow-hidden text-7xl font-thin"
                key={item}
                custom={{ isLast }}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: getDuration(isLast ? 0.1 : 0.01, i), ease: isLast ? 'easeInOut' : 'linear' }}
              >
                {item}
              </motion.p>
            )
          );
        })}
      </AnimatePresence>
      <motion.button className="" onClick={handleClick} whileTap={{ scale: 0.9, scaleY: 1 }} whileHover={{ scaleY: -1 }}>
        <Image src={ShuffleIcon} alt='shuffle' color={buttonColor} width={56} height={56} />
      </motion.button>
    </div>
    
  );
}
