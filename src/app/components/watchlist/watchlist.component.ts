import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { WatchlistService } from '../../services/watchlist.service';
import { TmdbImagePipe } from '../../pipes/tmdb-image.pipe';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TmdbImagePipe,
  ],
  template: `
    <div class="watchlist-container">
      <h2>My Watchlist</h2>

      @if (watchlist().length === 0) {
        <p>Your watchlist is empty. Start adding movies and TV shows!</p>
      } @else {
        <div class="watchlist-grid">
          @for (item of watchlist(); track item.id) {
            <mat-card
              [class.watched]="item.isWatched"
              (click)="toggleWatched(item.id, item.type)"
            >
              <img
                mat-card-image
                [src]="item.posterPath | tmdbImage"
                [alt]="item.title"
              />
              <mat-card-content>
                <h3>{{ item.title }}</h3>
                <p class="type-badge">
                  {{ item.type === 'movie' ? 'Movie' : 'TV Show' }}
                </p>
                @if (item.isWatched) {
                  <div class="watched-badge">
                    <mat-icon>check_circle</mat-icon>
                    <span>Watched</span>
                  </div>
                }
              </mat-card-content>
              <mat-card-actions>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="
                    removeFromWatchlist(item.id, item.type);
                    $event.stopPropagation()
                  "
                  aria-label="Remove from watchlist"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .watchlist-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .watchlist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      mat-card {
        cursor: pointer;
        transition:
          transform 0.2s,
          opacity 0.2s;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      mat-card.watched {
        opacity: 0.7;
        filter: grayscale(1);
      }

      mat-card:hover {
        transform: translateY(-5px);
      }

      mat-card-content {
        flex-grow: 1;
      }

      h3 {
        margin: 10px 0;
        font-size: 1.1rem;
      }

      .type-badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: #e0e0e0;
        font-size: 0.8rem;
        margin-top: 8px;
      }

      .watched-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #4caf50;
        margin-top: 8px;
      }

      img {
        height: 300px;
        object-fit: cover;
      }

      mat-card-actions {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
      }
    `,
  ],
})
export default class WatchlistComponent {
  private watchlistService = inject(WatchlistService);
  readonly watchlist = this.watchlistService.watchlist;

  toggleWatched(id: number, type: 'movie' | 'tv'): void {
    this.watchlistService.toggleWatchedStatus(id, type);
  }

  removeFromWatchlist(id: number, type: 'movie' | 'tv'): void {
    this.watchlistService.removeFromWatchlist(id, type);
  }
}
