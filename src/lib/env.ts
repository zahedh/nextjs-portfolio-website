export const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Optional: GitHub Personal Access Token for higher API rate limits.
 * Without a token, you're limited to 60 requests/hour.
 * Create at: https://github.com/settings/tokens
 * Scopes needed: read:user (or no scopes for public data)
 */
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
