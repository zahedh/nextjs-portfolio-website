'use client';
import {
  ProjectCard,
  ProjectDetailPanel,
  Section,
  PrimaryButton,
} from '@/components';
import { useGlobalStore } from '@/providers/global-store-provider';
import { isProjectActive } from '@/lib/ui-logic';
import { projectMatchesSkill } from '@/lib/project';
import { skillsData } from '@/data';
import type { Project } from '@/data/projects';
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

export default function ProjectsSection() {
  const isLargeScreen = useBreakpoint('lg');
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperReady, setSwiperReady] = useState(0);
  const [selectedType, setSelectedType] = useState<'All' | 'Web' | 'Mobile'>(
    'All'
  );
  const [panelProject, setPanelProject] = useState<Project | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const selectedSkillId = useGlobalStore((state) => state.selectedSkillId);
  const setSelectedSkillId = useGlobalStore(
    (state) => state.setSelectedSkillId
  );

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
  }, [isLargeScreen, activeIndex, selectedType, selectedSkillId, swiperReady]);

  const filteredProjects = useMemo(() => {
    let list: Project[];
    if (selectedSkillId) {
      list = projects.filter((project) =>
        projectMatchesSkill(project, selectedSkillId)
      );
    } else if (selectedType === 'All') {
      list = [...projects];
    } else {
      list = projects.filter((project) => project.projectType === selectedType);
    }
    return [...list].sort(
      (projectA, projectB) =>
        Number(isProjectActive(projectB)) - Number(isProjectActive(projectA))
    );
  }, [selectedType, selectedSkillId]);

  const selectedSkillLabel = selectedSkillId
    ? (skillsData.find((skill) => skill.id === selectedSkillId)?.label ??
      selectedSkillId)
    : null;

  const filterButtons = selectedSkillId ? (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <span
        className="text-brand-600 dark:text-brand-300 font-heading text-sm font-semibold tracking-tight sm:text-base"
        aria-live="polite"
      >
        {selectedSkillLabel}
      </span>
      <PrimaryButton
        onClick={() => setSelectedSkillId(null)}
        aria-label={en.projectFilters.clearSkillFilterAriaLabel}
      >
        {en.projectFilters.clearSkillFilter}
      </PrimaryButton>
    </div>
  ) : (
    <>
      <PrimaryButton
        onClick={() => setSelectedType('All')}
        className={selectedType !== 'All' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.all}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Web')}
        className={selectedType !== 'Web' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.web}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setSelectedType('Mobile')}
        className={selectedType !== 'Mobile' ? 'btn-toggle-idle' : ''}
      >
        {en.projectFilters.mobile}
      </PrimaryButton>
    </>
  );

  const handleOpenFullDetails = (project: Project) => {
    setPanelProject(project);
    setPanelOpen(true);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
  };

  const handlePanelExitComplete = () => {
    setPanelProject(null);
  };

  return (
    <Section
      anchor="projects"
      title={en.sectionHeaders.projects}
      filterButtons={filterButtons}
    >
      <ProjectDetailPanel
        project={panelProject}
        open={panelOpen}
        onClose={handleClosePanel}
        onExitComplete={handlePanelExitComplete}
      />
      <motion.div
        className="relative isolate w-full max-w-full min-w-0 overflow-x-clip"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedType}-${selectedSkillId ?? 'all'}`}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            <Swiper
              key={`${isLargeScreen ? 'cards' : 'slide'}-${selectedType}-${selectedSkillId ?? 'all'}`}
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
                setSwiperReady((count) => count + 1);
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
                  <ProjectCard
                    project={project}
                    imagePriority={index === activeIndex}
                    onOpenFullDetails={handleOpenFullDetails}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
