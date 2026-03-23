'use client';
import { motion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
  skipAnimation?: boolean;
  onAnimationComplete?: () => void;
};

export function AnimatedText({
  text,
  className,
  delay = 0.2,
  skipAnimation = false,
  onAnimationComplete,
}: AnimatedTextProps) {
  const initial = skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.span
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.8, delay }}
      onAnimationComplete={onAnimationComplete}
      aria-label={text}
    >
      {text}
    </motion.span>
  );
}
