'use client';

import { Section } from '@/components';
import { SkillTile } from '@/components/ui/tiles';
import { en } from '@/language';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiJquery,
  SiDotnet,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiTailwindcss,
  SiJira,
  SiGithub,
  SiPostman,
  SiSlack,
  SiDiscord,
  SiNotion,
  SiGoogledocs,
  SiOpenai,
  SiGooglegemini,
  SiMysql,
  SiAndroidstudio,
  SiXcode,
  SiMacos,
} from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import { Code2, Lightbulb, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function SkillsSection() {
  const skills = [
    { icon: SiReact, label: en.skillsCollageSection.reactNative },
    { icon: SiNextdotjs, label: en.skillsCollageSection.nextJS },
    { icon: SiReact, label: en.skillsCollageSection.react },
    { icon: SiTypescript, label: en.skillsCollageSection.typeScript },
    { icon: SiJavascript, label: en.skillsCollageSection.javaScript },
    { icon: SiJquery, label: en.skillsCollageSection.jquery },
    { icon: SiDotnet, label: en.skillsCollageSection.dotNet },
    { icon: Code2, label: en.skillsCollageSection.objectiveC },
    { icon: SiDotnet, label: en.skillsCollageSection.aspNet },
    { icon: SiDotnet, label: en.skillsCollageSection.visualBasicDotNet },
    { icon: Code2, label: en.skillsCollageSection.amp },
    { icon: SiHtml5, label: en.skillsCollageSection.html },
    { icon: SiCss3, label: en.skillsCollageSection.css },
    { icon: SiFigma, label: en.skillsCollageSection.figma },
    { icon: SiTailwindcss, label: en.skillsCollageSection.tailwind },
    { icon: SiJira, label: en.skillsCollageSection.jira },
    { icon: SiGithub, label: en.skillsCollageSection.github },
    { icon: SiPostman, label: en.skillsCollageSection.postman },
    { icon: SiSlack, label: en.skillsCollageSection.slack },
    { icon: SiDiscord, label: en.skillsCollageSection.discord },
    { icon: SiNotion, label: en.skillsCollageSection.notion },
    { icon: FaWindows, label: en.skillsCollageSection.microsoftOffice },
    { icon: SiGoogledocs, label: en.skillsCollageSection.googleDocs },
    { icon: SiGithub, label: en.skillsCollageSection.gitHubCopilot },
    { icon: SiOpenai, label: en.skillsCollageSection.chatGPT },
    { icon: SiGooglegemini, label: en.skillsCollageSection.gemini },
    { icon: SiGooglegemini, label: en.skillsCollageSection.noteBookLM },
    { icon: SiMysql, label: en.skillsCollageSection.mySQL },
    { icon: SiAndroidstudio, label: en.skillsCollageSection.androidStudio },
    { icon: SiXcode, label: en.skillsCollageSection.xcode },
    { icon: SiMacos, label: en.skillsCollageSection.macOS },
    { icon: FaWindows, label: en.skillsCollageSection.windows },
    { icon: Sparkles, label: en.skillsCollageSection.agile },
    { icon: Lightbulb, label: en.skillsCollageSection.promptEngineering },
  ];

  return (
    <Section anchor="skills" title={en.sectionHeaders.skillsCollage}>
      <div className="section-content mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6">
        {skills.map((skill, index) => {
          // Calculate row (assuming ~8-9 items per row with max-w-6xl)
          const row = Math.floor(index / 8);
          // Alternate direction per row
          const direction = row % 2 === 0 ? 1 : -1;
          // Offset each tile slightly for more organic movement
          const offset = (index % 8) * 0.5;

          return (
            <motion.div
              key={index}
              className="relative hover:z-[100]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              animate={{
                x: [0, direction * 12, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.03 },
                y: { duration: 0.5, delay: index * 0.03 },
                x: {
                  duration: 4 + offset,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: offset,
                  repeatType: 'loop',
                },
              }}
            >
              <SkillTile icon={skill.icon} label={skill.label} />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
