import { NextResponse } from "next/server";
import { fetchNowPlaying } from "@/lib/now-playing";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await fetchNowPlaying();
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
