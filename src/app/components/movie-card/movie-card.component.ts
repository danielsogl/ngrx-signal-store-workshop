import { DecimalPipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MovieSearchResult } from '../../models/movie.model';
import { TmdbImagePipe } from '../../pipes/tmdb-image.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    TmdbImagePipe,
    SlicePipe,
    DecimalPipe,
  ],
  template: ` @let movie = this.movie();

    <mat-card class="media-card">
      <img
        mat-card-image
        [src]="movie.poster_path | tmdbImage"
        [alt]="movie.title"
      />
      <mat-card-content>
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview | slice: 0 : 150 }}...</p>
        <div class="rating">
          Rating: {{ movie.vote_average | number: '1.1-1' }}/10
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary">View Details</button>
      </mat-card-actions>
    </mat-card>`,
})
export class MovieCardComponent {
  readonly movie = input.required<MovieSearchResult>();
}
