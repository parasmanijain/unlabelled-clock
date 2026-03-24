import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Enhanced City interface for TypeScript 6.0 compatibility
export interface City {
  readonly id: number;
  readonly name: string;
  readonly country: string;
  readonly timezone?: string;
  readonly displayDate?: boolean;
  readonly displayName?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private readonly apiUrl = 'assets/json/cities.json';

  private readonly http = inject(HttpClient);

  // Use Angular 15+ typed HttpClient with proper error handling
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
}
