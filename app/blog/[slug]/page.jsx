import Heading from "@/components/Header";
import { getPost } from "@/lib/post";

export default async function PostPage({ params }) {
    const { slug } = await params
    const post = await getPost(slug);
    return (
        <>
            <Heading>{post.title}</Heading>
            <p className="italic text-sm pb-2">{post.date} by {post.author}</p>
            <img src={post.image} alt="" width={640} height={360} className="mb-2 rounded" />
            <article className="prose max-w-screen-sm prose-slate" dangerouslySetInnerHTML={{ __html: post.body }} />
        </>
    )
}