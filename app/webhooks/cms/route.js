import { revalidate } from "@/app/blog/page";
import { CACHE_TAG_POSTS } from "@/lib/post";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    console.log(payload);
    if (payload.model === 'post') {
        revalidateTag(CACHE_TAG_POSTS);
        console.log('revalidated:', CACHE_TAG_POSTS);
    }
    return new Response(null, { status: 204 });
}