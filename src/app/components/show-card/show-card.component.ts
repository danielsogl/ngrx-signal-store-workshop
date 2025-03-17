import { DecimalPipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ShowSearchResult } from '../../models/ts-shows.model';
import { TmdbImagePipe } from '../../pipes/tmdb-image.pipe';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';

@Component({
  selector: 'app-show-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    TmdbImagePipe,
    SlicePipe,
    DecimalPipe,
    RouterLink,
    WatchlistButtonComponent,
  ],
  template: ` @let show = this.show();

    <mat-card class="media-card">
      <img
        mat-card-image
        [src]="show.poster_path | tmdbImage"
        [alt]="show.name"
      />
      <mat-card-content>
        <h3>{{ show.name }}</h3>
        <p>{{ show.overview | slice: 0 : 150 }}...</p>
        <div class="rating">
          Rating: {{ show.vote_average | number: '1.1-1' }}/10
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" [routerLink]="['/show', show.id]">
          View Details
        </button>
        <app-watchlist-button
          [itemId]="show.id"
          itemType="tv"
          [title]="show.name"
          [posterPath]="show.poster_path || ''"
        >
        </app-watchlist-button>
      </mat-card-actions>
    </mat-card>`,
  styles: [
    `
      mat-card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
      }
    `,
  ],
})
export class ComponentsShowCardComponent {
  readonly show = input.required<ShowSearchResult>();
}
