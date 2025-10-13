'use client';

import { useGlobalStore } from '@/providers/global-store-provider';
import { motion } from 'motion/react';

export default function Home() {
  const { count, incrementCount, decrementCount } = useGlobalStore(
    (state) => state
  );
  return (
    <div className="min-h-screen">
      <div className="mb-4">
        Count: {count}
        <hr />
        <button type="button" onClick={incrementCount}>
          Increment Count
        </button>
        <button type="button" onClick={decrementCount}>
          Decrement Count
        </button>
      </div>
      <motion.div
        className={'bg-secondary h-[200px] w-[200px] rounded-2xl'}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
