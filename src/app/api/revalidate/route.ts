import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("sanity");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
export async function GET() {
  revalidateTag("sanity");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
