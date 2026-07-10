/**
 * GET /api/now-playing
 *
 * Returns the caller's currently-playing Spotify track, falling back to the
 * most recently played track if nothing is active right now.
 *
 * Requires three environment variables set on your hosting platform:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN
 *
 * See the setup notes at the bottom of this file for how to obtain a
 * refresh token — it's a one-time step.
 */

declare const process: {
  env: Record<string, string | undefined>;
};

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN || "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify token: ${response.status}`);
  }
  return response.json();
}

function formatTrack(track: any, isPlaying: boolean) {
  return {
    isPlaying,
    title: track.name,
    artist: (track.artists || []).map((a: any) => a.name).join(", "),
    album: track.album?.name ?? null,
    albumArt: track.album?.images?.[0]?.url ?? null,
    songUrl: track.external_urls?.spotify ?? null,
    configured: true,
  };
}

export default async function handler(req: any, res: any) {
  // Cache at the edge for 15s, serve stale for a bit longer while revalidating.
  res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=30");

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(200).json({ isPlaying: false, configured: false });
  }

  try {
    const { access_token } = await getAccessToken();

    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data && data.item) {
        return res.status(200).json(formatTrack(data.item, Boolean(data.is_playing)));
      }
    }

    // Nothing currently playing (204 No Content, or no item) — show last played instead.
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const recentData = await recentRes.json();
    const track = recentData?.items?.[0]?.track;

    if (track) {
      return res.status(200).json(formatTrack(track, false));
    }

    return res.status(200).json({ isPlaying: false, configured: true });
  } catch (err) {
    console.error("now-playing error:", err);
    return res.status(200).json({ isPlaying: false, configured: true, error: true });
  }
}

/**
 * ---- One-time setup ----
 *
 * 1. Create an app at https://developer.spotify.com/dashboard
 *    - Note the Client ID and Client Secret.
 *    - Add a Redirect URI: http://127.0.0.1:3000/callback
 *      Spotify requires the explicit loopback IP (127.0.0.1), not the
 *      string "localhost" — apps created since April 2025 will reject
 *      "localhost" redirect URIs outright. It just needs to exist for the
 *      auth flow below; nothing has to actually be running on that port.
 *
 * 2. Visit this URL in your browser (swap in your real Client ID), then
 *    approve access:
 *
 *    https://accounts.spotify.com/authorize
 *      ?client_id=CLIENT_ID
 *      &response_type=code
 *      &redirect_uri=http://127.0.0.1:3000/callback
 *      &scope=user-read-currently-playing%20user-read-recently-played
 *
 * 3. You'll be redirected to a URL like
 *    http://127.0.0.1:3000/callback?code=AQD...  — the page itself will
 *    look broken (nothing's running there), that's fine. Copy the `code`
 *    value out of the address bar.
 *
 * 4. Exchange it for a refresh token (run once, from any terminal):
 *
 *    curl -X POST https://accounts.spotify.com/api/token \
 *      -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
 *      -d grant_type=authorization_code \
 *      -d code=PASTE_THE_CODE_HERE \
 *      -d redirect_uri=http://127.0.0.1:3000/callback
 *
 *    The JSON response includes a `refresh_token` — save it.
 *
 * 5. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN
 *    as environment variables in your hosting platform (Vercel: Project
 *    Settings → Environment Variables) and redeploy.
 *
 * Note: if you're deploying to Netlify instead of Vercel, this file needs to
 * move to netlify/functions/now-playing.ts and the handler signature changes
 * to `export const handler = async (event) => ({ statusCode, body })`. Say
 * the word and I'll adapt it.
 */