'use client';
import { ProjectCard, Section } from '@/components';
import { en } from '@/language';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { Pagination, Navigation, EffectCards } from 'swiper/modules';
import { projects } from '@/data/projects';

/** Section container for highlighted projects. */
export default function ProjectsSection() {
  return (
    <Section anchor="projects" title={en.sectionHeaders.projects}>
      <Swiper
        className="w-full flex-1 items-center justify-center"
        spaceBetween={50}
        pagination={{ type: 'bullets', clickable: true, dynamicBullets: true }}
        modules={[Pagination, Navigation, EffectCards]}
        effect="cards"
        cardsEffect={{
          slideShadows: false,
          perSlideOffset: 8,
          perSlideRotate: 2,
        }}
        navigation={true}
        slidesPerView={1}
      >
        {projects.map((project) => (
          <SwiperSlide
            key={project.id}
            className="mb-16 flex items-center justify-center"
          >
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
