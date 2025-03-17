import { Injectable, computed, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WatchlistItem } from '../models/watchlist.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private readonly watchlistSignal = signal<WatchlistItem[]>([]);
  private readonly snackBar = inject(MatSnackBar);

  readonly watchlist = this.watchlistSignal.asReadonly();

  readonly watchedItems = computed(() =>
    this.watchlistSignal().filter((item) => item.isWatched),
  );

  readonly unwatchedItems = computed(() =>
    this.watchlistSignal().filter((item) => !item.isWatched),
  );

  addToWatchlist(item: Omit<WatchlistItem, 'isWatched' | 'addedAt'>) {
    const newItem: WatchlistItem = {
      ...item,
      isWatched: false,
      addedAt: new Date(),
    };

    this.watchlistSignal.update((items) => {
      if (items.some((i) => i.id === item.id && i.type === item.type)) {
        return items;
      }

      this.snackBar.open(`Added ${item.title} to watchlist`, 'Close');
      return [...items, newItem];
    });
  }

  removeFromWatchlist(id: number, type: 'movie' | 'tv') {
    const item = this.watchlistSignal().find(
      (i) => i.id === id && i.type === type,
    );
    if (item) {
      this.watchlistSignal.update((items) => {
        const filtered = items.filter((i) => !(i.id === id && i.type === type));
        this.snackBar.open(`Removed ${item.title} from watchlist`, 'Close');
        return filtered;
      });
    }
  }

  toggleWatchedStatus(id: number, type: 'movie' | 'tv') {
    this.watchlistSignal.update((items) =>
      items.map((item) => {
        if (item.id === id && item.type === type) {
          const newStatus = !item.isWatched;
          this.snackBar.open(
            `Marked ${item.title} as ${newStatus ? 'watched' : 'unwatched'}`,
            'Close',
          );
          return { ...item, isWatched: newStatus };
        }
        return item;
      }),
    );
  }

  isInWatchlist(id: number, type: 'movie' | 'tv'): boolean {
    return this.watchlistSignal().some(
      (item) => item.id === id && item.type === type,
    );
  }

  getWatchedStatus(id: number, type: 'movie' | 'tv'): boolean {
    const item = this.watchlistSignal().find(
      (item) => item.id === id && item.type === type,
    );
    return item?.isWatched ?? false;
  }
}
