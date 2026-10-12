import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypewriterText = ({
  text = '',
  speed = 50,
  delay = 300,
  className = '',
  cursorClassName = 'text-pink-400',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsCompleted(false);

    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsCompleted(true);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        className={`inline-block ml-1 font-mono font-bold ${cursorClassName}`}
      >
        |
      </motion.span>
    </span>
  );
};

export default TypewriterText;
