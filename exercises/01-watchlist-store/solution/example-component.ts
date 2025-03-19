import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WatchlistStore } from './watchlist.store';
import { WatchlistItem } from '../../../src/app/models/watchlist.model';

/**
 * Example component showing how to use the WatchlistStore
 */
@Component({
  selector: 'app-watchlist-example',
  standalone: true,
  imports: [MatButtonModule],
  providers: [WatchlistStore], // Provide the store at component level
  template: `
    <h2>Watchlist ({{ store.watchlist().length }})</h2>

    <div>
      <h3>Watched Items ({{ store.watchedItems().length }})</h3>
      <ul>
        @for (item of store.watchedItems(); track item.id) {
          <li>
            {{ item.title }}
            <button
              mat-button
              color="primary"
              (click)="store.toggleWatchedStatus(item.id, item.type)"
            >
              Mark as Unwatched
            </button>
            <button
              mat-button
              color="warn"
              (click)="store.removeFromWatchlist(item.id, item.type)"
            >
              Remove
            </button>
          </li>
        }
      </ul>
    </div>

    <div>
      <h3>Unwatched Items ({{ store.unwatchedItems().length }})</h3>
      <ul>
        @for (item of store.unwatchedItems(); track item.id) {
          <li>
            {{ item.title }}
            <button
              mat-button
              color="primary"
              (click)="store.toggleWatchedStatus(item.id, item.type)"
            >
              Mark as Watched
            </button>
            <button
              mat-button
              color="warn"
              (click)="store.removeFromWatchlist(item.id, item.type)"
            >
              Remove
            </button>
          </li>
        }
      </ul>
    </div>

    <!-- Example button to add a mock item to the watchlist -->
    <button mat-raised-button color="accent" (click)="addMockMovie()">
      Add Sample Movie
    </button>
  `,
})
export class WatchlistExampleComponent {
  readonly store = inject(WatchlistStore);

  addMockMovie(): void {
    // Add a sample movie to the watchlist
    const mockItem: Omit<WatchlistItem, 'isWatched' | 'addedAt'> = {
      id: Math.floor(Math.random() * 1000),
      title: `Sample Movie ${Math.floor(Math.random() * 100)}`,
      type: 'movie',
      posterPath: '/sample-poster.jpg',
    };

    this.store.addToWatchlist(mockItem);
  }
}
