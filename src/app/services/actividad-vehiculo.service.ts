import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadVehiculoService {
  private baseUrl = 'http://localhost:8000/api/actividad_vehiculos'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades de vehículos
  getActividadesVehiculo(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Obtener una actividad de vehículo por ID
  getActividadVehiculoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva actividad de vehículo
  createActividadVehiculo(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Actualizar una actividad de vehículo
  updateActividadVehiculo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar una actividad de vehículo
  deleteActividadVehiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}

