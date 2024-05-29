"use client"

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ShuffleIcon from '../../../public/Shuffle.svg'; 

interface Props {
  textData : string[],
  dataFromMap : any[],
  onShuffle : () => Promise<void>,
  onPlaceSelected: (place: any) => void,
}

interface VariantProps {
  scaleY: number;
  y: string | number;
  opacity: number;
  filter?: string;
}

export default function Roulette({ textData, dataFromMap, onShuffle, onPlaceSelected }: Props): JSX.Element {
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialTextDisplayed, setInitialTextDisplayed] = useState(true);
  const [showPlace, setShowPlace] = useState(false);
  const maxIndexCount = 24;
  const data = textData.length > 0 ? textData : dataFromMap.map(place => place.place_name);

  const getDuration = (base: number, index: number): number => base * (index + 1) * 0.5;

  const getRandomNumbers = (count: number, min: number, max: number): number[] => {
    const numbers: Set<number> = new Set(); 
  
    while(numbers.size < count) {
        const random: number = Math.floor(Math.random() * (max - min + 1)) + min; // min과 max 사이의 난수 생성
        numbers.add(random); 
    }
    return Array.from(numbers); 
  }

  const itemsToShow = randomIndices.map(index => data[index]);

  useEffect(() => {
    if (!initialTextDisplayed && data.length > 0) {
      const newIndices = getRandomNumbers(Math.min(maxIndexCount, data.length), 0, data.length - 1);
      setRandomIndices(newIndices);
      setCurrentIndex(0);
      setShowPlace(false);
    }
  }, [data.length, initialTextDisplayed]); 

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null; // 인터벌 ID를 로컬 변수로 선언
  
    if (currentIndex < itemsToShow.length - 1) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % itemsToShow.length);
      }, getDuration(10, currentIndex));
    } else if (currentIndex === itemsToShow.length - 1 && itemsToShow.length > 0) {
      const selectedPlace = dataFromMap[randomIndices[currentIndex]];
      onPlaceSelected(selectedPlace);
      setShowPlace(true);
    }
  
    // 컴포넌트 언마운트 시 또는 의존성 배열의 값이 변경될 때 인터벌 정리
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentIndex, itemsToShow.length]);
  

  const handleClick = async () => {
    if (onShuffle) {
      await onShuffle();
    }

    if (data.length > 0) {
      const newIndices = getRandomNumbers(Math.min(maxIndexCount, data.length), 0, data.length - 1);
      setRandomIndices(newIndices);
      setCurrentIndex(0);
      setInitialTextDisplayed(false);
      setShowPlace(false);
    } else {
      console.warn("No data available to shuffle.");
    }
  };

  
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
    <div className='flex justify-between items-center font-extrabold px-9'>
      <div className='flex-grow text-center'>
        <AnimatePresence mode="popLayout" >
          {initialTextDisplayed ? (
              <motion.p className="overflow-hidden text-7xl font-pretendard font-extrabold" key="initial">
                아무거나
              </motion.p>
            ) : (
          itemsToShow.map((item, i) => {
            const isLast = i === itemsToShow.length - 1;

            return (
              i === currentIndex && (
                <motion.p
                  className="overflow-hidden text-7xl font-pretendard font-extrabold align-middle"
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
            )
      }))}
        </AnimatePresence>
      </div>
      <motion.button className="ml-auto" onClick={handleClick} whileTap={{ rotate: 720 }} whileHover={{ rotate: 90 }} style={{ originX: 0.5, originY: 0.5 }}>
        <ShuffleIcon style={{ fill: "#646464" }} width={35} height={35} />
      </motion.button>
    </div>
    
  );
}
