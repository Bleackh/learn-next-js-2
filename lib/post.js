import { readdir, readFile } from 'node:fs/promises'
import { marked } from "marked";
import matter from "gray-matter";
import qs from 'qs';

const headlessUrl = 'http://localhost:1337';

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
    const url = headlessUrl + "/api/posts" + "?" + qs.stringify({
        fields: ["slug", "title", "description", "publishedAt", "author", "body"],
        populate: { image: { fields: ["url"] } },
        sort: { publishedAt: "desc" },
        pagination: { pageSize: 3 },
    }, { encodeValuesOnly: true });
    const response = await fetch(url);
    const { data } = await response.json();

    return data.map((item) => ({
        slug: item.slug,
        title: item.title,
        description: item.description,
        date: item.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        author: item.author,
        body: item.body,
        image: headlessUrl + item.image.url
    }));
}