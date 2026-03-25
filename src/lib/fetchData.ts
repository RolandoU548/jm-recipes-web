// src/lib/fetchData.ts
// All data-fetching helpers with automatic fallback to mock data.

import { client } from './sanity';
import { mockRecipes, mockPosts, mockPodcasts } from './mockData';

const hasSanityConfig =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID &&
  import.meta.env.PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

/**
 * Converts a YouTube watch/short URL into an embeddable URL.
 * Returns null if the input is not a recognisable YouTube URL.
 */
export function toYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    // Already an embed URL
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/embed/')) {
      return url;
    }
    // youtube.com/watch?v=ID
    if (u.hostname.includes('youtube.com') && u.searchParams.has('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
    }
    // youtube.com/shorts/ID
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.split('/shorts/')[1].split('/')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtu.be/ID
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // invalid URL — fall through
  }
  return null;
}

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T[]> {
  if (!hasSanityConfig) return [];
  try {
    const result = await client.fetch<T[]>(query, params);
    return result ?? [];
  } catch {
    return [];
  }
}

// ── Recipes ───────────────────────────────────────────────────────────────────

export async function getRecipes() {
  const data = await safeFetch<any>(
    `*[_type == "recipe"] | order(_createdAt desc) {
      _id, _type, title, slug, mainImage, prepTime, cookTime, rating, tags, _createdAt
    }`
  );
  return data.length > 0 ? data : [...mockRecipes];
}

export async function getFeaturedRecipes(limit = 3) {
  const data = await safeFetch<any>(
    `*[_type == "recipe"] | order(_createdAt desc) [0...$limit] {
      _id, _type, title, slug, mainImage, prepTime, cookTime, rating, tags, _createdAt
    }`,
    { limit }
  );
  return data.length > 0 ? data : [...mockRecipes].slice(0, limit);
}

export async function getRecipeBySlug(slug: string) {
  const data = await safeFetch<any>(
    `*[_type == "recipe" && slug.current == $slug][0] {
      _id, _type, title, slug, mainImage, videoUrl,
      prepTime, cookTime, rating, tags, ingredients, instructions,
      _createdAt, _updatedAt
    }`,
    { slug }
  );
  const found = Array.isArray(data) ? data[0] : data;
  if (found) return found;
  return mockRecipes.find((r) => r.slug.current === slug) ?? mockRecipes[0];
}

export async function getAllRecipeSlugs(): Promise<{ slug: string }[]> {
  const data = await safeFetch<{ slug: { current: string } }>(
    `*[_type == "recipe"]{ slug }`
  );
  const sanitySlugs = data.map((r) => ({ slug: r.slug.current }));
  if (sanitySlugs.length > 0) return sanitySlugs;
  return mockRecipes.map((r) => ({ slug: r.slug.current }));
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function getPosts() {
  const data = await safeFetch<any>(
    `*[_type == "post"] | order(_createdAt desc) {
      _id, _type, title, slug, mainImage, tags, body, _createdAt
    }`
  );
  return data.length > 0 ? data : [...mockPosts];
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const data = await safeFetch<{ slug: { current: string } }>(
    `*[_type == "post"]{ slug }`
  );
  const sanitySlugs = data.map((p) => ({ slug: p.slug.current }));
  if (sanitySlugs.length > 0) return sanitySlugs;
  return mockPosts.map((p) => ({ slug: p.slug.current }));
}

export async function getPostBySlug(slug: string) {
  const data = await safeFetch<any>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, _type, title, slug, mainImage, videoUrl, tags, body, excerpt, _createdAt, _updatedAt
    }`,
    { slug }
  );
  const found = Array.isArray(data) ? data[0] : data;
  if (found) return found;
  return mockPosts.find((p) => p.slug.current === slug) ?? mockPosts[0];
}

// ── Podcasts ──────────────────────────────────────────────────────────────────

export async function getPodcasts() {
  const data = await safeFetch<any>(
    `*[_type == "podcast"] | order(_createdAt desc) {
      _id, _type, title, slug, audioUrl, description, _createdAt
    }`
  );
  return data.length > 0 ? data : [...mockPodcasts];
}

export async function getAllPodcastSlugs(): Promise<{ slug: string }[]> {
  const data = await safeFetch<{ slug: { current: string } }>(
    `*[_type == "podcast"]{ slug }`
  );
  const sanitySlugs = data.map((p) => ({ slug: p.slug.current }));
  if (sanitySlugs.length > 0) return sanitySlugs;
  return mockPodcasts.map((p) => ({ slug: p.slug.current }));
}

export async function getPodcastBySlug(slug: string) {
  const data = await safeFetch<any>(
    `*[_type == "podcast" && slug.current == $slug][0] {
      _id, _type, title, slug, audioUrl, description, excerpt, _createdAt
    }`,
    { slug }
  );
  const found = Array.isArray(data) ? data[0] : data;
  if (found) return found;
  return mockPodcasts.find((p) => p.slug.current === slug) ?? mockPodcasts[0];
}

// ── House Ads ─────────────────────────────────────────────────────────────────

export async function getHouseAds() {
  const data = await safeFetch<any>(
    `*[_type == "houseAd"] { _id, title, image, linkUrl }`
  );
  return data;
}

// ── Mixed Feed (recipes + posts sorted by date) ───────────────────────────────

export async function getMixedFeed(limit = 8) {
  const [recipes, posts] = await Promise.all([getRecipes(), getPosts()]);
  const combined = [...recipes, ...posts].sort((a, b) => {
    const dateA = a._createdAt ? new Date(a._createdAt).getTime() : 0;
    const dateB = b._createdAt ? new Date(b._createdAt).getTime() : 0;
    return dateB - dateA;
  });
  return combined.slice(0, limit);
}