import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:8000/api/areas';  // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener todas las áreas
  getAreas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para obtener un área por ID
  getAreaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para crear un área
  createArea(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Método para actualizar un área
  updateArea(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar un área
  deleteArea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
