"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface Props {
  textData : string[],
  dataFromMap : any[] | undefined,
  onShuffle? : () => Promise<void>,
  onPlaceRandom?: (place: any) => void,
  onAddHistory?: (place: any) => void,
}

interface VariantProps {
  scaleY: number;
  y: string | number;
  opacity: number;
  filter?: string;
}

export default function Roulette({ textData, dataFromMap = [], onShuffle, onPlaceRandom, onAddHistory }: Props): JSX.Element {
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialTextDisplayed, setInitialTextDisplayed] = useState(true);
  const maxIndexCount = 24;
  const executedRef = useRef(false);

  const getDuration = (base: number, index: number): number => base * (index + 1) * 0.5;

  const getRandomNumbers = (count: number, min: number, max: number): number[] => {
    const numbers: Set<number> = new Set(); 
  
    while(numbers.size < count) {
        const random: number = Math.floor(Math.random() * (max - min + 1)) + min; // min과 max 사이의 난수 생성
        numbers.add(random); 
    }
    return Array.from(numbers); 
  }

  const formatPlaceName = (name: string): string => {
    const words = name.split(' ');
    if (words.length > 1) {
      const lastWord = words[words.length - 1];
      if (lastWord.indexOf('점') !== -1) {
        return words.slice(0, -1).join(' ');
      }
    }
    return name
  }

  const data = textData.length > 0 ? textData : dataFromMap.map(place => formatPlaceName(place.place_name));
  const itemsToShow = randomIndices.map(index => data[index]);

  useEffect(() => {
    if (!initialTextDisplayed && data.length > 0) {
      const newIndices = getRandomNumbers(Math.min(maxIndexCount, data.length), 0, data.length - 1);
      setRandomIndices(newIndices);
      setCurrentIndex(0);
      executedRef.current = false;
    }
  }, [data.length, initialTextDisplayed]); 

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null; // 인터벌 ID를 로컬 변수로 선언
  
    if (currentIndex < itemsToShow.length - 1) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % itemsToShow.length);
      }, getDuration(10, currentIndex));
    } else if (currentIndex === itemsToShow.length - 1 && itemsToShow.length > 0 && !executedRef.current) {
      const randomPlace = dataFromMap[randomIndices[currentIndex]];
      if (onPlaceRandom) {
        onPlaceRandom(randomPlace);
      }
      if (onAddHistory) {
        onAddHistory(randomPlace);
      }
      executedRef.current = true;
    }
  
    // 컴포넌트 언마운트 시 또는 의존성 배열의 값이 변경될 때 인터벌 정리
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      executedRef.current = false;
    } else {
      // console.warn("No data available to shuffle.");
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

  const isTextData = textData.length > 0;
  const iconColor = isTextData ? "grey" : "white";
  const iconSizes = isTextData ? {
    mobile: 'w-5',  // 20px
    tablet: 'w-12',  // 48px
    tabletl: 'w-12',  // 48px
    laptop: 'w-[3.75rem]', // 60px
  } :
  {
    mobile: 'w-[1.625rem]',  // 20px
    tablet: 'w-9',       // 36px
    tabletl: 'w-12',  // 48px
    laptop: 'w-8', // 32px
  };

  return(
    <div className='relative flex items-center font-extrabold px-4 justify-center'>
      <div className='flex-grow text-center'>
        <AnimatePresence mode="popLayout" >
          {initialTextDisplayed ? (
              <motion.p className="overflow-hidden font-pretendard font-extrabold" key="initial">
                아무거나
              </motion.p>
            ) : (
          itemsToShow.map((item, i) => {
            const isLast = i === itemsToShow.length - 1;

            return (
              i === currentIndex && (
                <motion.p
                  className="overflow-hidden font-pretendard font-extrabold align-middle"
                  key={randomIndices[i]}
                  custom={{ isLast }}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit={ isLast ? '' : 'exit' }
                  transition={{ duration: getDuration(isLast ? 0.07 : 0.01, i), ease: isLast ? 'easeInOut' : 'linear' }}
                >
                  {item}
                </motion.p>
              )
            )
      }))}
        </AnimatePresence>
      </div>
      <motion.button 
        className="absolute right-4" 
        onClick={handleClick} 
        whileTap={{ rotate: 720 }} 
        whileHover={{ rotate: 90 }} 
        style={{ originX: 0.5, originY: 0.5 }}>
        <Image
          src={`/Shuffle_${iconColor}.svg`} // 색상에 따라 다른 아이콘 경로
          alt="Shuffle"
          width={0} // 기본 값으로 0을 설정
          height={0} // 기본 값으로 0을 설정
          style={{ width: '100%', height: '100%' }}
          className={`mobile:${iconSizes.mobile} tablet:${iconSizes.tablet} tablet-l:${iconSizes.tabletl} laptop:${iconSizes.laptop}`}
        />
      </motion.button>
    </div>
    
  );
}

Roulette.defaultProps = {
  onAddHistory: () => {},
  onShuffle: async () => {},
  onPlaceRandom: () => {},
};