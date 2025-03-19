import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  forkJoin,
  pipe,
  switchMap,
} from 'rxjs';
import { MovieSearchResult } from '../../../src/app/models/movie.model';
import { SearchResponse } from '../../../src/app/models/shared.model';
import { ShowSearchResult } from '../../../src/app/models/ts-shows.model';
import { TMDBService } from '../../../src/app/services/tmdb.service';

// Define the state interface for media data
export interface MediaState {
  trendingMovies: MovieSearchResult[];
  trendingShows: ShowSearchResult[];
  searchQuery: string;
  searchedMovies: MovieSearchResult[];
  searchedShows: ShowSearchResult[];
  isLoadingMovies: boolean;
  isLoadingShows: boolean;
}

// Define the initial state
const initialState: MediaState = {
  trendingMovies: [],
  trendingShows: [],
  searchQuery: '',
  searchedMovies: [],
  searchedShows: [],
  isLoadingMovies: false,
  isLoadingShows: false,
};

// Create the MediaStore using signalStore
export const MediaStore = signalStore(
  // Make the store injectable at the root level
  { providedIn: 'root' },

  // Add the initial state using withState
  withState(initialState),

  // Add computed properties using withComputed
  withComputed(
    ({
      trendingMovies,
      trendingShows,
      searchQuery,
      searchedMovies,
      searchedShows,
    }) => ({
      // Display trending content if no search query, otherwise show search results
      movies: computed(() =>
        searchQuery() ? searchedMovies() : trendingMovies(),
      ),

      shows: computed(() =>
        searchQuery() ? searchedShows() : trendingShows(),
      ),

      // Add additional computed properties for convenience
      hasResults: computed(() =>
        searchQuery()
          ? searchedMovies().length > 0 || searchedShows().length > 0
          : true,
      ),
    }),
  ),

  // Add methods using withMethods
  withMethods((store, tmdbService = inject(TMDBService)) => ({
    // Load initial trending data
    async loadTrending(): Promise<void> {
      // Load trending movies
      patchState(store, { isLoadingMovies: true });
      const moviesResponse = await tmdbService.getTrendingMovies().toPromise();
      if (moviesResponse) {
        patchState(store, {
          trendingMovies: moviesResponse.results,
          isLoadingMovies: false,
        });
      }

      // Load trending shows
      patchState(store, { isLoadingShows: true });
      const showsResponse = await tmdbService.getTrendingShows().toPromise();
      if (showsResponse) {
        patchState(store, {
          trendingShows: showsResponse.results,
          isLoadingShows: false,
        });
      }
    },

    // Handle search with rxMethod for reactive search
    search: rxMethod<string>(
      pipe(
        // Debounce to avoid too many API calls
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          // Update search query in state
          patchState(store, { searchQuery: query });

          // If empty query, don't make API calls and return empty observable
          if (!query) {
            return EMPTY;
          }

          // Set loading states
          patchState(store, {
            isLoadingMovies: true,
            isLoadingShows: true,
          });

          // Search for both movies and shows in parallel
          return forkJoin([
            tmdbService.searchMovies(query).pipe(
              tapResponse({
                next: (response: SearchResponse<MovieSearchResult>) => {
                  patchState(store, {
                    searchedMovies: response.results,
                    isLoadingMovies: false,
                  });
                },
                error: (error) => {
                  console.error('Error searching movies:', error);
                  patchState(store, { isLoadingMovies: false });
                },
              }),
            ),
            tmdbService.searchShows(query).pipe(
              tapResponse({
                next: (response: SearchResponse<ShowSearchResult>) => {
                  patchState(store, {
                    searchedShows: response.results,
                    isLoadingShows: false,
                  });
                },
                error: (error) => {
                  console.error('Error searching shows:', error);
                  patchState(store, { isLoadingShows: false });
                },
              }),
            ),
          ]);
        }),
      ),
    ),

    // Clear search and return to trending
    clearSearch(): void {
      patchState(store, {
        searchQuery: '',
        searchedMovies: [],
        searchedShows: [],
      });
    },
  })),
);
