import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoaService {
  private baseUrl = 'http://localhost:8000/api/poas'; // Ajusta la URL según tu configuración
  private apiUrl = 'http://localhost:8000/api'; // Cambia según tu configuración
  constructor(private http: HttpClient) {}

  // Obtener todos los POAs
 /*  getPoas(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  } */
  // Obtener todas las POAs
  getPoas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/poas`);
  }

  // Obtener operaciones por código POA
/*   getOperacionesByPoa(idPoa: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/poas/${idPoa}/operaciones`);
  } */
  getOperacionesByPoaId(poaId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/poas/${poaId}/operaciones`);
  }
  // Obtener un POA por ID
  getPoaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo POA
  createPoa(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Actualizar un POA
  updatePoa(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un POA
  deletePoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
