import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class OperacionService {
  private apiUrl = `${environment.apiUrl}/api/operaciones`; // URL base para las operaciones

  constructor(private http: HttpClient) {}

  // Método para cargar POAs
  loadPoas(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/poas`);
  }

  // Método para cargar todas las operaciones
  loadOperaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para obtener una operación por ID
  getOperacionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para registrar una nueva operación
  registerOperacion(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Método para actualizar una operación existente
  updateOperacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  // Método para eliminar una operación
  deleteOperacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

