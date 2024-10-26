import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  //private baseUrl = 'http://localhost:8000/api/vehiculos'; // Ajusta la URL según tu configuración
  private apiUrl = `${environment.apiUrl}/api/vehiculos`;

  constructor(private http: HttpClient) {}

  // Obtener todos los vehículos
  getVehiculos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un vehículo por ID
  getVehiculoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo vehículo
  createVehiculo(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar un vehículo
  updateVehiculo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar un vehículo
  deleteVehiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener vehículos disponibles
  getVehiculosDisponibles(): Observable<any> {
    //return this.http.get('http://localhost:8000/api/vehiculos/disponibles');
    return this.http.get<any>(`${this.apiUrl}/disponibles`); // Asegúrate de implementar esta ruta en tu API
  }
}
