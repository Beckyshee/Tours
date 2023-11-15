

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private apiUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  searchTours(location: string): Observable<any[]> {
    // Implement logic to fetch tours from the backend API
    const url = `${this.apiUrl}/tours?location=${location}`;
    return this.http.get<any[]>(url);
  }

  
}
