import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private apiUrl = 'http://localhost:8000/api/municipios'; // Cambia esto a tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los municipios
  getMunicipios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // Obtener municipios por ID de coordinación
  getMunicipiosByCoordinacion(coordinacionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coordinaciones/${coordinacionId}/municipios`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio de municipios:', error);
    return throwError(error);
  }
}
