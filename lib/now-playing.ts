import {
  curatedPayload,
  type NowPlayingPayload,
} from "@/lib/now-playing-shared";

export type { NowPlayingPayload, NowPlayingTrack } from "@/lib/now-playing-shared";
export { curatedPayload, CURATED_NOW_PLAYING, pickCuratedTrack } from "@/lib/now-playing-shared";

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
};

type SpotifyCurrentlyPlaying = {
  is_playing?: boolean;
  item?: {
    name?: string;
    artists?: Array<{ name?: string }>;
    album?: { images?: Array<{ url?: string }> };
    external_urls?: { spotify?: string };
  } | null;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function spotifyConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID?.trim() &&
      process.env.SPOTIFY_CLIENT_SECRET?.trim() &&
      process.env.SPOTIFY_REFRESH_TOKEN?.trim(),
  );
}

async function getAccessToken(): Promise<string | null> {
  if (!spotifyConfigured()) return null;

  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 30_000) {
    return cachedToken.value;
  }

  const id = process.env.SPOTIFY_CLIENT_ID!.trim();
  const secret = process.env.SPOTIFY_CLIENT_SECRET!.trim();
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN!.trim();
  const basic = Buffer.from(`${id}:${secret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("spotify_token_refresh_failed", res.status);
    return null;
  }

  const json = (await res.json()) as SpotifyTokenResponse;
  if (!json.access_token) {
    console.error("spotify_token_missing", json.error);
    return null;
  }

  cachedToken = {
    value: json.access_token,
    expiresAt: now + 55 * 60_000,
  };
  return json.access_token;
}

export async function fetchNowPlaying(): Promise<NowPlayingPayload> {
  const token = await getAccessToken();
  if (!token) return curatedPayload();

  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    if (res.status === 204) return curatedPayload();
    if (!res.ok) {
      console.error("spotify_currently_playing_failed", res.status);
      return curatedPayload();
    }

    const json = (await res.json()) as SpotifyCurrentlyPlaying;
    const item = json.item;
    if (!item?.name) return curatedPayload();

    const artist =
      item.artists
        ?.map((entry) => entry.name)
        .filter(Boolean)
        .join(", ") || "Unknown artist";

    return {
      isPlaying: Boolean(json.is_playing),
      source: "spotify",
      track: {
        title: item.name,
        artist,
        albumArtUrl: item.album?.images?.[0]?.url,
        url: item.external_urls?.spotify,
      },
    };
  } catch (error) {
    console.error("spotify_currently_playing_error", error);
    return curatedPayload();
  }
}
