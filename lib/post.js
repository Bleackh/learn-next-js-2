import { readdir } from 'node:fs/promises'
import { marked } from "marked";
import qs from 'qs';

export const CACHE_TAG_POSTS = 'posts';
const headlessUrl = 'http://localhost:1337';

export async function getPost(slug) {
    const { data } = await fetchPosts({
        filters: {
            slug: {
                $eq: slug
            },
        },
        fields: ["slug", "title", "description", "publishedAt", "author", "body"],
        populate: { image: { fields: ["url"] } },
        sort: { publishedAt: "desc" },
        pagination: { pageSize: 3, withCount: false },
    });
    if (data.length === 0) {
        return null;
    }
    return {
        ...toPost(data[0]),
        body: marked(data[0].body, { headerIDs: false, mangle: false }),
    }

}

export async function getSlugs() {
    const { data } = await fetchPosts({
        fields: ["slug"],
        sort: { publishedAt: "desc" },
        pagination: { pageSize: 100 },
    });

    return data.map((post) => post.slug);
}

export async function getAllPosts(pageSize, page) {
    const { data, meta } = await fetchPosts({
        fields: ["slug", "title", "description", "publishedAt", "author"],
        populate: { image: { fields: ["url"] } },
        sort: { publishedAt: "desc" },
        pagination: { pageSize, page },
    });

    return {
        pageCount: meta.pagination.pageCount,
        posts: data.map(toPost)
    };
}

async function fetchPosts(params) {
    const url = `${headlessUrl}/api/posts?${qs.stringify(params, { encodeValuesOnly: true })}`;
    console.log(url);
    const response = await fetch(url, {
        next: {
            tags: [CACHE_TAG_POSTS],
        }
    });
    return response.json();
}

function toPost(data) {
    return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        date: data.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        author: data.author,
        image: headlessUrl + data.image.url
    }
}