export type SpotifyKind = "track" | "album" | "playlist";
export type SpotifyLink = { kind: SpotifyKind; id: string; canonicalUrl: string };
const ID = /^[A-Za-z0-9]{22}$/;
/** Parse only official Spotify URLs; do not fetch arbitrary user-provided URLs. */
export function parseSpotifyUrl(raw: string): SpotifyLink | null {
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "https:" || url.hostname !== "open.spotify.com" || url.port || url.username || url.password) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const normalized = parts[0]?.startsWith("intl-") ? parts.slice(1) : parts;
    if (normalized.length !== 2) return null;
    const [kind, id] = normalized;
    if (!(["track", "album", "playlist"] as string[]).includes(kind) || !ID.test(id)) return null;
    return { kind: kind as SpotifyKind, id, canonicalUrl: `https://open.spotify.com/${kind}/${id}` };
  } catch { return null; }
}
