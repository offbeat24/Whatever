"use client"

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ShuffleIcon from '../../../public/Shuffle.svg'; 

interface Props {
  textData : string[],
  textClass: string,
}
export default function Roulette({textData, textClass}: Props): JSX.Element {
  const [textListIndex, setTextListIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextListIndex(Math.floor(Math.random() * 361));
    }, 5000);

    return () => clearInterval(interval);
  }, [textData]);

  return(
    <div className='flex'>
      <p className={textClass}>{textData[textListIndex]}</p>
    </div>
    
  );
}
