import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../models/config.model';
import { MovieDetails, MovieSearchResult } from '../models/movie.model';
import { SearchResponse } from '../models/shared.model';
import { ShowDetails, ShowSearchResult } from '../models/ts-shows.model';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/tmdb';

  getConfig(): Observable<Config> {
    return this.http.get<Config>(`${this.url}/configuration`);
  }

  getTrendingMovies(): Observable<SearchResponse<MovieSearchResult>> {
    return this.http.get<SearchResponse<MovieSearchResult>>(
      `${this.url}/trending/movie/day`,
    );
  }

  getTrendingShows(): Observable<SearchResponse<ShowSearchResult>> {
    return this.http.get<SearchResponse<ShowSearchResult>>(
      `${this.url}/trending/tv/day`,
    );
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.url}/movie/${id}`);
  }

  getShowDetails(id: string): Observable<ShowDetails> {
    return this.http.get<ShowDetails>(`${this.url}/tv/${id}`);
  }
}
