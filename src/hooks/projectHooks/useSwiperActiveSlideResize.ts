'use client';

import type { Swiper as SwiperType } from 'swiper';
import { type RefObject, useEffect } from 'react';

/** When not in cards mode, keep Swiper height in sync with the active slide’s content. */
export function useSwiperActiveSlideResize({
  isLargeScreen,
  swiperRef,
  activeIndex,
  selectedType,
  selectedSkillId,
  swiperReady,
}: {
  isLargeScreen: boolean;
  swiperRef: RefObject<SwiperType | null>;
  activeIndex: number;
  selectedType: 'All' | 'Web' | 'Mobile';
  selectedSkillId: string | null;
  swiperReady: number;
}) {
  useEffect(() => {
    if (isLargeScreen) return;
    const swiper = swiperRef.current;
    if (!swiper?.slides?.length) return;
    const slide = swiper.slides[activeIndex];
    if (!slide) return;
    const resizeObserver = new ResizeObserver(() => {
      swiper.update();
    });
    resizeObserver.observe(slide);
    return () => resizeObserver.disconnect();
  }, [
    isLargeScreen,
    activeIndex,
    selectedType,
    selectedSkillId,
    swiperReady,
    swiperRef,
  ]);
}
