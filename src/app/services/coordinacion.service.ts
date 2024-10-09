import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinacionService {
  private apiUrl = 'http://localhost:8000/api/coordinaciones'; // Cambia esto a tu API

  constructor(private http: HttpClient) {}

  getCoordinaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
