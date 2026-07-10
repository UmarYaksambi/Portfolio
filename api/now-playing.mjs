// api/now-playing.mjs
//
// GET /api/now-playing
// Returns the caller's currently-playing Spotify track, falling back to the
// most recently played track if nothing is active right now.
//
// Requires SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// set as environment variables on Vercel.
//
// Uses the .mjs extension on purpose: it forces Node to treat this file as
// an ES module unconditionally, regardless of "type" in package.json or
// whether that field survives Vercel's function bundling step.

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
    "base64"
  );
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

function formatTrack(track, isPlaying) {
  return {
    isPlaying,
    title: track.name,
    artist: (track.artists || []).map((a) => a.name).join(", "),
    album: track.album ? track.album.name : null,
    albumArt:
      track.album && track.album.images && track.album.images[0]
        ? track.album.images[0].url
        : null,
    songUrl: track.external_urls ? track.external_urls.spotify : null,
    configured: true,
  };
}

export default async function handler(req, res) {
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
    const track =
      recentData && recentData.items && recentData.items[0]
        ? recentData.items[0].track
        : null;

    if (track) {
      return res.status(200).json(formatTrack(track, false));
    }

    return res.status(200).json({ isPlaying: false, configured: true });
  } catch (err) {
    console.error("now-playing error:", err);
    return res.status(200).json({ isPlaying: false, configured: true, error: true });
  }
}
