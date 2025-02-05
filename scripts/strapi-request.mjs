import { writeFileSync } from 'fs';
import qs from 'qs';

const url = "http://localhost:1337/api/posts" + "?" + qs.stringify({
    fields: ["slug", "title", "description", "publishedAt", "author", "body"],
    populate: { image: { fields: ["url"] } },
    sort: { publishedAt: "desc" },
    pagination: { pageSize: 3, page: 1 },
}, { encodeValuesOnly: true });
const response = await fetch(url);
const body = await response.json();
const post = JSON.stringify(body, null, 2);
console.log(post);

const file = 'scripts/strapi-response.json';
writeFileSync(file, post, 'utf8');