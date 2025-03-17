export interface WatchlistItem {
  id: number;
  title: string;
  type: 'movie' | 'tv';
  posterPath: string;
  isWatched: boolean;
  addedAt: Date;
}
