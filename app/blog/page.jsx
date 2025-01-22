import Link from "next/link";
import Heading from "@/components/Header";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/post";

export const metadata = {
    title: "Blog Page"
}

export const revalidate = 30;

export default async function Blog() {
    const posts = await getAllPosts();
    return (
        <>
            <Heading>Blog Page</Heading>
            <p className="text-2xl mb-3">This is the blog page.</p>

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