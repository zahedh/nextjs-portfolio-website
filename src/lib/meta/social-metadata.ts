/**
 * Link preview images for social apps.
 *
 * WhatsApp, Facebook, LinkedIn, Slack, etc. use **Open Graph** (`og:image`).
 * X/Twitter use **Twitter Card** tags (`twitter:image`).
 */
export const SOCIAL_SHARE_IMAGE_PATH = '/images/twitter-card.png';

/** Increment when replacing the share image file so `og:image` URLs change and caches refresh. */
export const SOCIAL_SHARE_IMAGE_CACHE_BUST = '2';

export const socialShareImageUrl = `${SOCIAL_SHARE_IMAGE_PATH}?v=${SOCIAL_SHARE_IMAGE_CACHE_BUST}`;

export const socialShareImageMeta = {
  url: socialShareImageUrl,
  width: 1024,
  height: 682,
  alt: 'Zahed Heidari - Web & Mobile Developer',
} as const;
