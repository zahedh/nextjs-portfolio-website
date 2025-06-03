'use client'

import { useGlobalStore } from "@/providers/global-store-provider";

export default function Home() {
    const { count, incrementCount, decrementCount } = useGlobalStore(
    (state) => state,
  )
  return (
    <div>
      Count: {count}
      <hr />
      <button type="button" onClick={incrementCount}>
        Increment Count
      </button>
      <button type="button" onClick={decrementCount}>
        Decrement Count
      </button>
    </div>
  );
}