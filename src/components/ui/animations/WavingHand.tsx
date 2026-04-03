'use client';
import { motion } from 'motion/react';

export function WavingHand() {
  return (
    <motion.span
      style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
      }}
      aria-label="Waving hand"
      role="img"
    >
      👋
    </motion.span>
  );
}
