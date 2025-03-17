import {
  provideAppInitializer,
  inject,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Config } from '../models/config.model';
import { TMDBService } from '../services/tmdb.service';

export const tmdbConfig = signal<Config | null>(null);

export const provideTMDBConfig = () =>
  makeEnvironmentProviders([
    provideAppInitializer(async () => {
      const tmdbService = inject(TMDBService);
      const config = await firstValueFrom(tmdbService.getConfig());
      tmdbConfig.set(config);
      return config;
    }),
  ]);
