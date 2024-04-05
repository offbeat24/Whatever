import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ShuffleIcon from '@/components/Icons/shuffle'; // 확인이 필요한 경로

interface Props {
  textData: string[];
  variant: {
    wrapperClass: string;
    textClass: string;
    buttonClass: string;
    buttonColor: string;
  };
  onButtonClick: (setCurrentIndex: React.Dispatch<React.SetStateAction<number>>, length: number) => void;
}

const Roulette: React.FC<Props> = ({ textData, variant, onButtonClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textArr = [...textData, ...textData]; // 단순화를 위해 배열을 복사하여 확장

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % textArr.length);
    }, 2000); // 2초마다 변경

    return () => clearInterval(interval);
  }, [textArr.length]);

  return (
    <div className={`flex flex-col items-center ${variant.wrapperClass}`}>
      <AnimatePresence>
        {textArr.map((text, i) => (
          i === currentIndex && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${variant.textClass}`}
            >
              {text}
            </motion.div>
          )
        ))}
      </AnimatePresence>
      <motion.button
        className={`mt-4 ${variant.buttonClass}`}
        onClick={() => onButtonClick(setCurrentIndex, textArr.length)}
        whileTap={{ scale: 0.9, scaleY: 1 }}
        whileHover={{ scaleY: -1 }}
      >
        <ShuffleIcon fill={variant.buttonColor || 'black'} />
      </motion.button>
    </div>
  );
};

export default SlotMachine;
