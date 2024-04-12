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

export default function Roulette({ textData }: Props): JSX.Element {
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const maxIndexCount = 40;
  const buttonColor = 'rgb(75, 85, 99)';

  const getDuration = (base: number, index: number): number => base * (index + 1) * 0.5;

  const getRandomNumbers = (count: number, min: number, max: number): number[] => {
    const numbers: Set<number> = new Set(); 
  
    while(numbers.size < count) {
        const random: number = Math.floor(Math.random() * (max - min + 1)) + min; // min과 max 사이의 난수 생성
        numbers.add(random); 
    }
  
    return Array.from(numbers); 
  }

  const itemsToShow = randomIndices.map(index => textData[index]);

  useEffect(() => {
    // 최초 마운트시에 40개의 무작위 인덱스를 선택
    setRandomIndices(getRandomNumbers(maxIndexCount, 0, textData.length - 1));
  }, [textData.length]);

  useEffect(() => {
    if (currentIndex < maxIndexCount - 1) {
      const id = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % maxIndexCount);
      }, getDuration(10, currentIndex));
      setIntervalId(id);
      return () => clearInterval(id);
    } 
      clearInterval(intervalId as NodeJS.Timeout);
    
  }, [currentIndex, maxIndexCount]);

  function handleClick() {
    if (currentIndex >= maxIndexCount - 1) {
      setCurrentIndex(0);
      setRandomIndices(getRandomNumbers(maxIndexCount, 0, textData.length - 1));
    }
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
        {itemsToShow.map((item, i) => {
          const isLast = i === itemsToShow.length - 1;

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
