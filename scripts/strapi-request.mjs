import { writeFileSync } from 'fs';

const url = "http://localhost:1337/api/posts" + "?populate=*";
const response = await fetch(url);
const body = await response.json();
const post = JSON.stringify(body, null, 2);
console.log(post);

const file = 'scripts/strapi-response.json';
writeFileSync(file, post, 'utf8');