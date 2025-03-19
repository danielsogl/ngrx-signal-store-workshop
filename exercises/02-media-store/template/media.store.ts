import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { MovieSearchResult } from '../../../src/app/models/movie.model';
import { ShowSearchResult } from '../../../src/app/models/ts-shows.model';
import { TMDBService } from '../../../src/app/services/tmdb.service';

// TODO: Define the state interface for media data
export interface MediaState {
  // Include properties for:
  // - trending movies
  // - trending shows
  // - search query
  // - loading states
}

// TODO: Define the initial state
const initialState: MediaState = {
  // Initialize your state here
};

// TODO: Create the MediaStore using signalStore
export const MediaStore =
  signalStore();
  // TODO: Make the store injectable at the root level

  // TODO: Add the initial state using withState

  // TODO: Add computed properties using withComputed
  // Consider adding computed properties for:
  // - combined search results
  // - filtered results

  // TODO: Add methods using withMethods
  // Implement methods for:
  // - loading trending media
  // - handling search

/**
 * Reference implementation from MediaOverviewComponent:
 *
 * protected readonly searchControl = new FormControl('');
 * protected readonly searchTerm$ = this.searchControl.valueChanges.pipe(
 *   startWith(''),
 *   debounceTime(300),
 *   distinctUntilChanged(),
 * );
 *
 * protected readonly movies$: Observable<MovieSearchResult[]> = combineLatest({
 *   searchTerm: this.searchTerm$,
 * }).pipe(
 *   switchMap(({ searchTerm }) => {
 *     if (!searchTerm) {
 *       return this.tmdbService.getTrendingMovies();
 *     }
 *     return this.tmdbService.searchMovies(searchTerm);
 *   }),
 *   map((response: SearchResponse<MovieSearchResult>) => response.results),
 * );
 *
 * protected readonly shows$: Observable<ShowSearchResult[]> = combineLatest({
 *   searchTerm: this.searchTerm$,
 * }).pipe(
 *   switchMap(({ searchTerm }) => {
 *     if (!searchTerm) {
 *       return this.tmdbService.getTrendingShows();
 *     }
 *     return this.tmdbService.searchShows(searchTerm);
 *   }),
 *   map((response: SearchResponse<ShowSearchResult>) => response.results),
 * );
 */
