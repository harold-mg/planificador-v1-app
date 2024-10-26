import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  //private apiUrl = 'http://localhost:8000/api/municipios'; // Cambia esto a tu API
  private apiUrl = `${environment.apiUrl}/api/municipios`;
  private coordinacionesUrl = `${environment.apiUrl}/coordinaciones`;
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
  // Obtener todas las coordinaciones
  getCoordinaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.coordinacionesUrl).pipe(
      catchError(this.handleError)
    );
  }
  registerMunicipio(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio de municipios:', error);
    return throwError(error);
  }
}
