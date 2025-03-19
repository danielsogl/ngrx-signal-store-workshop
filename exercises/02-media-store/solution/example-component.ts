import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MovieCardComponent } from '../../../src/app/components/movie-card/movie-card.component';
import { ShowCardComponent } from '../../../src/app/components/show-card/show-card.component';
import { MediaStore } from './media.store';

/**
 * Example component showing how to use the MediaStore
 */
@Component({
  selector: 'app-media-overview-example',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MovieCardComponent,
    ShowCardComponent,
  ],
  providers: [MediaStore], // Provide the store at component level
  template: `
    <h1>Media Library</h1>

    <!-- Search input -->
    <mat-form-field appearance="outline" class="search-field">
      <mat-label>Search</mat-label>
      <input
        matInput
        [ngModel]="store.searchQuery()"
        (ngModelChange)="store.search($event)"
        placeholder="Search for movies or TV shows"
      />
    </mat-form-field>

    <!-- Tabs for movies and shows -->
    <mat-tab-group>
      <!-- Movies tab -->
      <mat-tab label="Movies">
        @if (store.isLoadingMovies()) {
          <div class="loading-spinner">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        } @else if (store.movies().length) {
          <div class="grid">
            @for (movie of store.movies(); track movie.id) {
              <app-movie-card [movie]="movie"></app-movie-card>
            }
          </div>
        } @else {
          <div class="no-results">
            <p>No movies found.</p>
          </div>
        }
      </mat-tab>

      <!-- TV Shows tab -->
      <mat-tab label="TV Shows">
        @if (store.isLoadingShows()) {
          <div class="loading-spinner">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        } @else if (store.shows().length) {
          <div class="grid">
            @for (show of store.shows(); track show.id) {
              <app-show-card [show]="show"></app-show-card>
            }
          </div>
        } @else {
          <div class="no-results">
            <p>No TV shows found.</p>
          </div>
        }
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    .search-field {
      width: 100%;
      max-width: 500px;
      margin-bottom: 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      padding: 50px 0;
    }

    .no-results {
      padding: 50px 0;
      text-align: center;
      font-size: 1.2em;
      color: #888;
    }
  `,
})
export default class MediaOverviewExampleComponent implements OnInit {
  readonly store = inject(MediaStore);

  ngOnInit(): void {
    this.store.loadTrending();
  }
}
