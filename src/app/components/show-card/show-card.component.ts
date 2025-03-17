import { DecimalPipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ShowSearchResult } from '../../models/ts-shows.model';
import { TmdbImagePipe } from '../../pipes/tmdb-image.pipe';

@Component({
  selector: 'app-show-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    TmdbImagePipe,
    SlicePipe,
    DecimalPipe,
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
        <button mat-button color="primary">View Details</button>
      </mat-card-actions>
    </mat-card>`,
})
export class ComponentsShowCardComponent {
  readonly show = input.required<ShowSearchResult>();
}
