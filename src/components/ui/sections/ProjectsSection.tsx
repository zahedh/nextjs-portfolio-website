'use client';
import { ProjectCard, Section } from '@/components';
import { en } from '@/language';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { projects } from '@/data/projects';

/** Section container for highlighted projects. */
export default function ProjectsSection() {
  return (
    <Section anchor="projects" title={en.sectionHeaders.projects}>
      <Swiper
        className="w-1/2 flex-1 items-center justify-center"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
