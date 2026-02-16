'use client';
import { ProjectCard, Section, PrimaryButton } from '@/components';
import { en } from '@/language';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { Pagination, Navigation, EffectCards } from 'swiper/modules';
import { projects } from '@/data/projects';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useBreakpoint } from '@/hooks/utilityHooks';

/** Section container for highlighted projects. */
export default function ProjectsSection() {
  const isLargeScreen = useBreakpoint('lg');
  const [selectedType, setSelectedType] = useState<'All' | 'Mobile' | 'Web'>(
    'All'
  );

  const filteredProjects = useMemo(() => {
    return selectedType === 'All'
      ? projects
      : projects.filter((project) => project.projectType === selectedType);
  }, [selectedType]);

  const filterButtons = (
    <>
      <PrimaryButton
        onClick={() => setSelectedType('All')}
        className={selectedType !== 'All' ? 'opacity-50' : ''}
      >
        {en.projectFilters.all}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Mobile')}
        className={selectedType !== 'Mobile' ? 'opacity-50' : ''}
      >
        {en.projectFilters.mobile}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Web')}
        className={selectedType !== 'Web' ? 'opacity-50' : ''}
      >
        {en.projectFilters.web}
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
        <Swiper
          key={`${isLargeScreen ? 'cards' : 'slide'}-${selectedType}`}
          className="w-full"
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
        >
          {filteredProjects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="mb-16 flex items-center justify-center"
            >
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Section>
  );
}
