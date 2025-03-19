import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { MovieSearchResult } from '../../models/movie.model';
import { SearchResponse } from '../../models/shared.model';
import { ShowSearchResult } from '../../models/ts-shows.model';
import { TMDBService } from '../../services/tmdb.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ShowCardComponent } from '../show-card/show-card.component';

@Component({
  selector: 'app-media-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MovieCardComponent,
    ShowCardComponent,
  ],
  templateUrl: './media-overview.component.html',
  styleUrls: ['./media-overview.component.scss'],
})
export default class MediaOverviewComponent {
  private readonly tmdbService = inject(TMDBService);

  protected readonly searchControl = new FormControl('');
  protected readonly searchTerm$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
  );

  protected readonly movies$: Observable<MovieSearchResult[]> =
    this.searchTerm$.pipe(
      switchMap((searchTerm) => {
        if (!searchTerm) {
          return this.tmdbService.getTrendingMovies();
        }
        return this.tmdbService.searchMovies(searchTerm);
      }),
      map((response: SearchResponse<MovieSearchResult>) => response.results),
    );

  protected readonly shows$: Observable<ShowSearchResult[]> =
    this.searchTerm$.pipe(
      switchMap((searchTerm) => {
        if (!searchTerm) {
          return this.tmdbService.getTrendingShows();
        }
        return this.tmdbService.searchShows(searchTerm);
      }),
      map((response: SearchResponse<ShowSearchResult>) => response.results),
    );
}
