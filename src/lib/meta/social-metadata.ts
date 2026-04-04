/**
 * Link preview images for social apps.
 *
 * WhatsApp, Facebook, LinkedIn, Slack, etc. use **Open Graph** (`og:image`).
 * X/Twitter use **Twitter Card** tags (`twitter:image`).
 *
 * Default asset is an optimized JPEG (see `scripts/generate-og-share.mjs`, source `twitter-card.png`).
 */
export const SOCIAL_SHARE_IMAGE_PATH = '/images/twitter-card-og.jpg';

/** Increment when replacing the share image file so `og:image` URLs change and caches refresh. */
export const SOCIAL_SHARE_IMAGE_CACHE_BUST = '4';

export const socialShareImageUrl = `${SOCIAL_SHARE_IMAGE_PATH}?v=${SOCIAL_SHARE_IMAGE_CACHE_BUST}`;

export const socialShareImageMeta = {
  url: socialShareImageUrl,
  width: 945,
  height: 630,
  alt: 'Zahed Heidari - Web & Mobile Developer',
} as const;
