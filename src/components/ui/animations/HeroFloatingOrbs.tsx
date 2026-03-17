'use client';

import { motion } from 'motion/react';

interface OrbConfig {
  size: number;
  x: [number, number, number, number];
  y: [number, number, number, number];
  duration: number;
  delay: number;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

const orbs: OrbConfig[] = [
  {
    size: 64,
    x: [0, 40, -20, 0],
    y: [0, -30, 20, 0],
    duration: 18,
    delay: 0,
    left: '10%',
    top: '20%',
  },
  {
    size: 48,
    x: [0, -30, 25, 0],
    y: [0, 40, -25, 0],
    duration: 22,
    delay: 2,
    right: '15%',
    top: '40%',
  },
  {
    size: 80,
    x: [0, 50, -40, 0],
    y: [0, -20, 35, 0],
    duration: 20,
    delay: 1,
    left: '20%',
    bottom: '25%',
  },
  {
    size: 40,
    x: [0, -25, 35, 0],
    y: [0, 35, -20, 0],
    duration: 24,
    delay: 3,
    right: '20%',
    bottom: '30%',
  },
  {
    size: 56,
    x: [0, 30, -35, 0],
    y: [0, -40, 30, 0],
    duration: 19,
    delay: 0.5,
    left: '50%',
    top: '10%',
  },
  {
    size: 32,
    x: [0, -40, 20, 0],
    y: [0, 25, -35, 0],
    duration: 21,
    delay: 1.5,
    right: '25%',
    top: '60%',
  },
];

/** Floating orbs that drift behind hero content. Works in both vertical (mobile) and horizontal (desktop) layout. */
export default function HeroFloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="bg-brand-400/20 dark:bg-brand-500/15 absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            right: orb.right,
            top: orb.top,
            bottom: orb.bottom,
          }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
