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
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
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
