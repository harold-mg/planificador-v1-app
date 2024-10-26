import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  //private apiUrl = 'http://localhost:8000/api/unidades'; // Cambia la URL si es necesario
  private apiUrl = `${environment.apiUrl}/api/unidades`; 
  constructor(private http: HttpClient) {}

  registrarUnidad(unidad: any): Observable<any> {
    return this.http.post(this.apiUrl, unidad);
  }

  // Método para obtener todas las unidades
  getUnidades(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

/*   obtenerUnidad(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  } */

  // Obtener una unidad por su ID
  getUnidadById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  // Obtener Area segun la Unidad
  getAreasByUnidadId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/areas`);
  }
  // Actualizar una unidad
  updateUnidad(id: number, unidad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, unidad);
  }
  // Eliminar una unidad
  deleteUnidad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

