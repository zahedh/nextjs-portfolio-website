import { useEffect } from 'react';

export type CalendarSize = {
  blockSize: number;
  blockMargin: number;
  blockRadius: number;
  fontSize: number;
};

export function getInitialSize(): CalendarSize {
  if (typeof window === 'undefined') {
    return { blockSize: 18, blockMargin: 5, blockRadius: 3, fontSize: 14 };
  }
  const width = window.innerWidth;
  if (width < 640) {
    return { blockSize: 14, blockMargin: 4, blockRadius: 2, fontSize: 13 };
  } else if (width < 768) {
    return { blockSize: 15, blockMargin: 4, blockRadius: 3, fontSize: 14 };
  } else if (width < 1024) {
    return { blockSize: 16, blockMargin: 5, blockRadius: 3, fontSize: 15 };
  } else if (width < 1280) {
    return { blockSize: 18, blockMargin: 5, blockRadius: 3, fontSize: 16 };
  } else {
    return { blockSize: 20, blockMargin: 6, blockRadius: 4, fontSize: 16 };
  }
}

export function useResponsiveCalendarSize(
  setSize: (size: CalendarSize) => void
) {
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSize({
          blockSize: 14,
          blockMargin: 4,
          blockRadius: 2,
          fontSize: 13,
        });
      } else if (width < 768) {
        setSize({
          blockSize: 15,
          blockMargin: 4,
          blockRadius: 3,
          fontSize: 14,
        });
      } else if (width < 1024) {
        setSize({
          blockSize: 16,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 15,
        });
      } else if (width < 1280) {
        setSize({
          blockSize: 18,
          blockMargin: 5,
          blockRadius: 3,
          fontSize: 16,
        });
      } else {
        setSize({
          blockSize: 20,
          blockMargin: 6,
          blockRadius: 4,
          fontSize: 16,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [setSize]);
}
