import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PoaService {
  //private baseUrl = 'http://localhost:8000/api/poas'; // Ajusta la URL según tu configuración
  //private apiUrl = 'http://localhost:8000/api'; // Cambia según tu configuración
  private apiUrl = `${environment.apiUrl}/api/poas`;
  constructor(private http: HttpClient) {}

  // Obtener todas las POAs
  getPoas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
    // Método para obtener POAs por unidad
  getPoasByUnidad(unidadId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/unidad/${unidadId}`);
  }

  getOperacionesByPoaId(poaId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${poaId}/operaciones`);
  }
  // Obtener un POA por ID
  getPoaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo POA
  createPoa(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar un POA
  updatePoa(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar un POA
  deletePoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
