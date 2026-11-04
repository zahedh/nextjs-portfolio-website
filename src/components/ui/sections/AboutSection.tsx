import { Section } from '@/components';
import { aboutCredentialLines } from '@/data/about';
import { en } from '@/language';
import Image from 'next/image';
import { aboutPhoto } from '@/images';

/** About: photograph with its stickers, narrative and credential rail, arranged per breakpoint by `.about-grid`. */
export function AboutSection() {
  const [narrativeFirst, narrativeSecond] = en.aboutSection.narrativeParagraphs;

  return (
    <Section anchor="about" title={en.sectionHeaders.about}>
      <div className="about-grid">
        <div className="about-visual">
          {/* sizes asks for twice each frame width: a source at the frame's own
              width rendered visibly soft, while one twice as wide, scaled down
              by the browser, renders sharp. */}
          <Image
            src={aboutPhoto}
            alt={en.aboutSection.photoAlt}
            placeholder="blur"
            fill
            sizes="(min-width: 48rem) 640px, 704px"
          />
          <ul className="about-stickers">
            {en.aboutSection.stickers.map((sticker) => (
              <li key={sticker} className="about-sticker">
                {sticker}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-narrative">
          <p>{narrativeFirst}</p>
          <p>{narrativeSecond}</p>
        </div>

        <aside
          aria-labelledby="about-credentials-heading"
          className="about-credentials"
        >
          <h3
            id="about-credentials-heading"
            className="about-credentials-heading"
          >
            {en.aboutSection.credentialsHeading}
          </h3>
          <ul className="about-credential-list">
            {aboutCredentialLines.map((line) => (
              <li key={line} className="about-credential">
                {line}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
