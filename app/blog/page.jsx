import Link from "next/link";
import Heading from "@/components/Header";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/post";
import Pagination from "@/components/pagination";

export const metadata = {
    title: "Blog Page"
}

export const revalidate = 30;

export default async function Blog({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const page = parsePageParam(resolvedSearchParams.page);

    const { pageCount, posts } = await getAllPosts(3, page);
    return (
        <>
            <Heading>Blog Page</Heading>
            <h2 className="text-2xl mb-3">This is the blog page.</h2>
            <Pagination href="/blog" page={page} pageCount={pageCount} />
            {posts.map((post) => (
                <PostCard
                    key={post.title}
                    title={post.title}
                    href={`/blog/${post.slug}`}
                    image={post.image}
                    description={post.description}
                    date={post.date}
                    author={post.author}
                />
            ))}
        </>
    )
}

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}