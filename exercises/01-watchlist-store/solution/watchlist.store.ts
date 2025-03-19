import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { WatchlistItem } from '../../../src/app/models/watchlist.model';

// Define the state interface for the watchlist
export interface WatchlistState {
  items: WatchlistItem[];
}

// Define the initial state
const initialState: WatchlistState = {
  items: [],
};

// Create the WatchlistStore using signalStore
export const WatchlistStore = signalStore(
  // Make the store injectable at the root level
  { providedIn: 'root' },

  // Add the initial state using withState
  withState(initialState),

  // Add computed properties using withComputed
  withComputed(({ items }) => ({
    // Convert the existing computed properties from WatchlistService
    watchlist: computed(() => items()),
    watchedItems: computed(() => items().filter((item) => item.isWatched)),
    unwatchedItems: computed(() => items().filter((item) => !item.isWatched)),
  })),

  // Add methods using withMethods
  withMethods((store, snackBar = inject(MatSnackBar)) => ({
    // Convert the existing methods from WatchlistService
    addToWatchlist(item: Omit<WatchlistItem, 'isWatched' | 'addedAt'>): void {
      const newItem: WatchlistItem = {
        ...item,
        isWatched: false,
        addedAt: new Date(),
      };

      const items = store.items();
      if (items.some((i) => i.id === item.id && i.type === item.type)) {
        return;
      }

      snackBar.open(`Added ${item.title} to watchlist`, 'Close');
      patchState(store, { items: [...items, newItem] });
    },

    removeFromWatchlist(id: number, type: 'movie' | 'tv'): void {
      const items = store.items();
      const item = items.find((i) => i.id === id && i.type === type);

      if (item) {
        const filtered = items.filter((i) => !(i.id === id && i.type === type));
        snackBar.open(`Removed ${item.title} from watchlist`, 'Close');
        patchState(store, { items: filtered });
      }
    },

    toggleWatchedStatus(id: number, type: 'movie' | 'tv'): void {
      const items = store.items();
      const updatedItems = items.map((item) => {
        if (item.id === id && item.type === type) {
          const newStatus = !item.isWatched;
          snackBar.open(
            `Marked ${item.title} as ${newStatus ? 'watched' : 'unwatched'}`,
            'Close',
          );
          return { ...item, isWatched: newStatus };
        }
        return item;
      });

      patchState(store, { items: updatedItems });
    },

    isInWatchlist(id: number, type: 'movie' | 'tv'): boolean {
      return store.items().some((item) => item.id === id && item.type === type);
    },

    getWatchedStatus(id: number, type: 'movie' | 'tv'): boolean {
      const item = store
        .items()
        .find((item) => item.id === id && item.type === type);
      return item?.isWatched ?? false;
    },
  })),
);
