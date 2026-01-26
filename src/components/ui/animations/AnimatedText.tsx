'use client';
import { motion } from 'framer-motion';

type AnimatedText = {
  text: string;
  className?: string;
  delay?: number;
};

export function AnimatedText({ text, className, delay = 0.2 }: AnimatedText) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      aria-label={text}
    >
      {text}
    </motion.span>
  );
}
