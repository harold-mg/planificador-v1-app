import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CoordinacionService {
  //private apiUrl = 'http://localhost:8000/api/coordinaciones'; // Cambia esto a tu API
  private apiUrl = `${environment.apiUrl}/api/coordinaciones`;
  constructor(private http: HttpClient) {}

  getCoordinaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Crear una nueva coordinación
  createCoordinacion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Obtener una coordinación específica por ID
  getCoordinacionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una coordinación existente
  updateCoordinacion(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una coordinación
  deleteCoordinacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
