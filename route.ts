import { NextRequest, NextResponse } from "next/server";
import { parseSpotifyUrl } from "@/lib/spotify";
export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const url = typeof body === "object" && body !== null && "url" in body ? (body as {url:unknown}).url : null;
  if (typeof url !== "string" || url.length > 2048) return NextResponse.json({ error: "Enter a Spotify URL (max 2048 characters)." }, { status: 400 });
  const parsed = parseSpotifyUrl(url);
  if (!parsed) return NextResponse.json({ error: "Use a valid open.spotify.com track, album or playlist link." }, { status: 400 });
  return NextResponse.json({ ...parsed, status: "metadata_not_connected", message: "Link validated. Metadata and licensed download sources will be connected in Stage 2." });
}
