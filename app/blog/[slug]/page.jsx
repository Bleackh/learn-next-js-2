import Heading from "@/components/Header";
import { getPost, getSlugs } from "@/lib/post";
import ShareLinkButton from "@/components/ShareLinkButton";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPost(slug);

    return {
        title: post.title,
        description: post.description,
    };
}

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }) {
    const { slug } = await params
    const post = await getPost(slug);
    return (
        <>
            <Heading>{post.title}</Heading>
            <div className="flex items-baseline gap-3 pb-2">
                <p className="italic text-sm pb-2">{post.date} by {post.author}</p>
                <ShareLinkButton />
            </div>
            <img src={post.image} alt="" width={640} height={360} className="mb-2 rounded" />
            <article className="prose max-w-screen-sm prose-slate" dangerouslySetInnerHTML={{ __html: post.body }} />
        </>
    )
}