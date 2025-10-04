// lib/post.ts
import fs from "fs";
import path from "path";
import { cache } from "react";

const postsDir = path.join(process.cwd(), "content/post");

export interface Post {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  content?: string;
}

// Cache the posts data for better performance
let postsCache: Post[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getAllPosts = cache((): Post[] => {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return postsCache;
  }

  try {
    const files = fs.readdirSync(postsDir);
    const posts = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const filePath = path.join(postsDir, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          return {
            slug: data.slug,
            title: data.title,
            date: data.date,
            author: data.author,
            excerpt: data.excerpt,
            image: data.image,
            category: data.category,
            tags: data.tags,
            content: data.content
          } as Post;
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          return null;
        }
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Update cache
    postsCache = posts;
    cacheTimestamp = now;
    
    return posts;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
});

export const getPostsByCategory = cache((category: string): Post[] => {
  return getAllPosts().filter(post => post.category === category);
});

export const getPost = cache((slug: string): Post | null => {
  try {
    const filePath = path.join(postsDir, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      image: data.image,
      category: data.category,
      tags: data.tags,
      content: data.content
    };
  } catch {
    return null;
  }
});

// Generate static params for all posts
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
