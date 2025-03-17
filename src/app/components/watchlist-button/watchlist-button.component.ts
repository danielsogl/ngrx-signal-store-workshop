import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <button mat-icon-button (click)="toggleWatchlist()">
      <mat-icon>
        {{ isInWatchlist() ? 'favorite' : 'favorite_border' }}
      </mat-icon>
    </button>
  `,
  styles: [
    `
      .mat-icon {
        color: #ff4081;
      }
    `,
  ],
})
export class WatchlistButtonComponent {
  private readonly watchlistService = inject(WatchlistService);

  readonly itemId = input.required<number>();
  readonly itemType = input.required<'movie' | 'tv'>();
  readonly title = input.required<string>();
  readonly posterPath = input.required<string>();

  readonly isInWatchlist = computed(() =>
    this.watchlistService.isInWatchlist(this.itemId(), this.itemType()),
  );

  toggleWatchlist(): void {
    if (this.isInWatchlist()) {
      this.watchlistService.removeFromWatchlist(this.itemId(), this.itemType());
    } else {
      this.watchlistService.addToWatchlist({
        id: this.itemId(),
        type: this.itemType(),
        title: this.title(),
        posterPath: this.posterPath(),
      });
    }
  }
}
