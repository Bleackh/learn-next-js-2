import { readdir, readFile } from 'node:fs/promises'
import { marked } from "marked";
import matter from "gray-matter";

export async function getPost(slug) {
    const text = await readFile(`./content/blog/${slug}.md`, 'utf8')
    const { content, data: { title, image, description, date, author } } = matter(text);
    const body = marked(content);

    return { slug, title, image, description, date, author, body }
}

export async function getSlugs() {
    const files = await readdir('./content/blog', 'utf8')
    return files
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.slice(0, -'.md'.length));
}

export async function getAllPosts() {
    const slugs = await getSlugs();

    const posts = [];

    for (const slug of slugs) {
        const post = await getPost(slug);
        posts.push(post);
    }

    return posts;
}