/**
 * Link preview images for social apps.
 *
 * WhatsApp, Facebook, LinkedIn, Slack, Discord, etc. read **Open Graph** (`og:image`).
 * X/Twitter use **Twitter Card** tags (`twitter:image`).
 *
 * **Dimensions** must match `public/images/social-share-card.png` (IHDR). A mismatch between
 * `og:image:width` / `og:image:height` and the real file can cause some crawlers (notably
 * WhatsApp) to drop the preview while others (e.g. Discord) still show it.
 *
 * **File size:** very large PNGs can also hurt WhatsApp; if previews fail only there,
 * consider a smaller export while keeping this path or bump `SOCIAL_SHARE_IMAGE_CACHE_BUST`.
 */
export const SOCIAL_SHARE_IMAGE_PATH = '/images/social-share-card.png';

/** Increment when replacing the share image file so `og:image` URLs change and caches refresh. */
export const SOCIAL_SHARE_IMAGE_CACHE_BUST = '1';

export const socialShareImageUrl = `${SOCIAL_SHARE_IMAGE_PATH}?v=${SOCIAL_SHARE_IMAGE_CACHE_BUST}`;

export const socialShareImageMeta = {
  url: socialShareImageUrl,
  width: 1536,
  height: 1024,
  alt: 'Zahed Heidari - Web & Mobile Developer',
} as const;
