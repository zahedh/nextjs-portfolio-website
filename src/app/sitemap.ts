import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const SITE_URL = 'https://zahedheidari.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
