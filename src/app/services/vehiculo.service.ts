import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private baseUrl = 'http://localhost:8000/api/vehiculos'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los vehículos
  getVehiculos(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Obtener un vehículo por ID
  getVehiculoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo vehículo
  createVehiculo(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Actualizar un vehículo
  updateVehiculo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un vehículo
  deleteVehiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Obtener vehículos disponibles
  getVehiculosDisponibles(): Observable<any> {
    //return this.http.get('http://localhost:8000/api/vehiculos/disponibles');
    return this.http.get<any>(`${this.baseUrl}/disponibles`); // Asegúrate de implementar esta ruta en tu API
  }
}
