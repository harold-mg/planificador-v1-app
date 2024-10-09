import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentroSaludService {
  private baseUrl = 'http://localhost:8000/api/centros_salud'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los centros de salud
  getCentrosSalud(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(err => {
        console.error('Error al obtener centros de salud:', err);
        return throwError(err);
      })
    );
  }

  // Obtener un centro de salud por ID (opcional)
  getCentroSaludById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo centro de salud (opcional)
  createCentroSalud(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Actualizar un centro de salud (opcional)
  updateCentroSalud(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un centro de salud (opcional)
  deleteCentroSalud(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  // Obtener todas las coordinaciones
  getCoordinaciones(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/coordinaciones`);
  }

  // Obtener municipios por coordinacion
  getMunicipiosByCoordinacion(coordinacionId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/municipios/coordinacion/${coordinacionId}`);
  }
  // Obtener centros de salud por municipio
  getCentrosSaludByMunicipio(municipioId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/municipios/${municipioId}/centros_salud`).pipe(
      catchError(this.handleError)
    );
  }
    // Manejo de errores
    private handleError(error: any): Observable<never> {
      console.error('Error al obtener centros de salud:', error);
      return throwError(error);
    }
  }
/* export class CentroSaludService {

  private apiUrl = 'http://localhost:8000/api/centros_salud'; // Reemplaza con tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las coordinaciones
  getCoordinaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coordinaciones`);
  }

  // Obtener municipios por coordinación
  getMunicipiosByCoordinacion(coordinacionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coordinaciones/${coordinacionId}/municipios`);
  }

  // Obtener centros de salud por municipio
  getCentrosDeSaludByMunicipio(municipioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipios/${municipioId}/centros-salud`);
  }
} */
