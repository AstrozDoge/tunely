# Tunely — Stage 1

A dark-green Next.js starter for a Spotify-link-based **authorised** music download service.

## Run locally

Requires Node.js 20.9+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Included
- Responsive homepage, input, loading and error states
- Strict server-side parser for HTTPS `open.spotify.com/{track|album|playlist}/{22-character-id}` URLs (also supports `intl-*` locale prefix and query parameters)
- `POST /api/resolve` endpoint that validates links and returns honest integration status
- No Spotify token required for Stage 1; no unauthorised downloading

## Test API
```bash
curl -X POST http://localhost:3000/api/resolve -H 'Content-Type: application/json' -d '{"url":"https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC"}'
```

## Project layout
- `src/app/page.tsx` — homepage and results
- `src/app/globals.css` — theme
- `src/app/layout.tsx` — page metadata
- `src/app/api/resolve/route.ts` — API
- `src/lib/spotify.ts` — URL parser

## Next stages
1. Review Spotify Developer Policy and eligibility for the planned use before requesting access. Do not assume Spotify metadata can be republished for a downloader.
2. Integrate permitted metadata sources; obtain explicit credentials and keep them server-side.
3. Build a licensed-audio-provider adapter with exact recording matching, rights validation and source attribution.
4. Only enable download buttons when the provider permits downloading and your use complies with the licence.
5. Add queue-backed playlist ZIP generation, file-size limits, expiry and rate limits. Do not cache or redistribute recordings without permission.
6. Add tests, monitoring, privacy and terms pages, accessibility review and production deployment.

## Important
Spotify's APIs do not supply MP3 files. This project neither extracts protected streams nor uses a YouTube-ripping fallback. Stage 1 is a functioning URL-validation prototype, not a music downloader yet.
