import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private apiUrl = 'http://localhost:8000/api/unidades'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  registrarUnidad(unidad: any): Observable<any> {
    return this.http.post(this.apiUrl, unidad);
  }

  obtenerUnidades(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerUnidad(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

