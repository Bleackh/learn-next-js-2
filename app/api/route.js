import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.jso({ hello: "world" })
}