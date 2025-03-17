import { Pipe, PipeTransform } from '@angular/core';
import { tmdbImageUrl } from '../config/config';
@Pipe({
  name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {
  private readonly tmdbImageUrl = tmdbImageUrl;

  transform(value?: string): string {
    return value ? `${this.tmdbImageUrl()}/${value}` : '';
  }
}
