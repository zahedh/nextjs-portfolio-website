'use client';
import { ProjectCard, Section, PrimaryButton } from '@/components';
import { en } from '@/language';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { Pagination, Navigation, EffectCards } from 'swiper/modules';
import { projects } from '@/data/projects';
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBreakpoint } from '@/hooks/utilityHooks';

/** Section container for highlighted projects. */
export default function ProjectsSection() {
  const isLargeScreen = useBreakpoint('lg');
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<'All' | 'Web' | 'Mobile'>(
    'All'
  );

  // On mobile, when the active slide content resizes (e.g. card expand/collapse), tell Swiper to recalc height
  useEffect(() => {
    if (isLargeScreen) return;
    const swiper = swiperRef.current;
    if (!swiper?.slides?.length) return;
    const slide = swiper.slides[activeIndex];
    if (!slide) return;
    const ro = new ResizeObserver(() => {
      swiper.update();
    });
    ro.observe(slide);
    return () => ro.disconnect();
  }, [isLargeScreen, activeIndex, selectedType]);

  const filteredProjects = useMemo(() => {
    return selectedType === 'All'
      ? projects
      : projects.filter((project) => project.projectType === selectedType);
  }, [selectedType]);

  const filterButtons = (
    <>
      <PrimaryButton
        onClick={() => setSelectedType('All')}
        className={selectedType !== 'All' ? 'filter-inactive' : ''}
      >
        {en.projectFilters.all}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Web')}
        className={selectedType !== 'Web' ? 'filter-inactive' : ''}
      >
        {en.projectFilters.web}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Mobile')}
        className={selectedType !== 'Mobile' ? 'filter-inactive' : ''}
      >
        {en.projectFilters.mobile}
      </PrimaryButton>
    </>
  );

  return (
    <Section
      anchor="projects"
      title={en.sectionHeaders.projects}
      filterButtons={filterButtons}
    >
      <motion.div
        className="relative isolate w-full overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            <Swiper
              key={`${isLargeScreen ? 'cards' : 'slide'}-${selectedType}`}
              className="projects-section-swiper w-full"
              spaceBetween={50}
              pagination={{
                type: 'bullets',
                clickable: true,
                dynamicBullets: true,
              }}
              modules={
                isLargeScreen
                  ? [Pagination, Navigation, EffectCards]
                  : [Pagination, Navigation]
              }
              effect={isLargeScreen ? 'cards' : 'slide'}
              cardsEffect={
                isLargeScreen
                  ? {
                      slideShadows: false,
                      perSlideOffset: 8,
                      perSlideRotate: 2,
                    }
                  : undefined
              }
              navigation={true}
              slidesPerView={1}
              autoHeight={!isLargeScreen}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.activeIndex);
              }}
              onSlideChangeTransitionEnd={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide
                  key={project.id}
                  className="mb-16 flex items-center justify-center"
                >
                  <ProjectCard project={project} imagePriority={index === 0} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
