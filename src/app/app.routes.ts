import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/media-overview/media-overview.component'),
  },
  {
    path: 'movie/:movieId',
    loadComponent: () =>
      import('./components/movie-details/movie-details.component'),
  },
  {
    path: 'show/:showId',
    loadComponent: () =>
      import('./components/show-details/show-details.component'),
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./components/watchlist/watchlist.component'),
  },
];
