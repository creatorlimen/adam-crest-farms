import { getCollection } from 'astro:content';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { visiblePosts } from './site.mjs';

export async function getPosts() {
  const all = await getCollection('blog');
  for (const post of all) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id) || ['about', 'topics'].includes(post.id)) throw new Error(`Invalid or reserved article slug: ${post.id}`);
    if (!existsSync(path.join(process.cwd(), 'public', post.data.image))) throw new Error(`Missing article image: ${post.data.image}`);
  }
  return visiblePosts(all);
}
