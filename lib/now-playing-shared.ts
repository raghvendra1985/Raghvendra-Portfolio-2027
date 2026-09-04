export type NowPlayingTrack = {
  title: string;
  artist: string;
  albumArtUrl?: string;
  url?: string;
};

export type NowPlayingPayload = {
  isPlaying: boolean;
  source: "spotify" | "curated";
  track: NowPlayingTrack;
};

/** Shown when Spotify is quiet or credentials are unset. */
export const CURATED_NOW_PLAYING: NowPlayingTrack[] = [
  {
    title: "Time in a Bottle",
    artist: "Jim Croce",
    url: "https://open.spotify.com/search/Time%20in%20a%20Bottle%20Jim%20Croce",
  },
  {
    title: "We Are",
    artist: "One Piece · First Ending",
    url: "https://open.spotify.com/search/One%20Piece%20We%20Are",
  },
  {
    title: "Lemon Tree",
    artist: "Fools Garden",
    url: "https://open.spotify.com/search/Lemon%20Tree%20Fools%20Garden",
  },
];

export function pickCuratedTrack(now = Date.now()): NowPlayingTrack {
  const day = Math.floor(now / 86_400_000);
  return CURATED_NOW_PLAYING[day % CURATED_NOW_PLAYING.length]!;
}

export function curatedPayload(now = Date.now()): NowPlayingPayload {
  return {
    isPlaying: false,
    source: "curated",
    track: pickCuratedTrack(now),
  };
}
