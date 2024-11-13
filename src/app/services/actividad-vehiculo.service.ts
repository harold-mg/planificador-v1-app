import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ActividadVehiculoService {
  //private baseUrl = 'http://localhost:8000/api/actividad_vehiculos'; // Ajusta la URL según tu configuración
  private apiUrl = `${environment.apiUrl}/api/actividad_vehiculos`;
  router: any;

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades de vehículos
  getActividadesVehiculo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getActividadesVehiculoCompleto(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/actividad_vehiculos_poa`); // Asegúrate de que esta URL sea la correcta
  }
  // Obtener una actividad de vehículo por ID
  getActividadVehiculoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getActividadById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/actividades/${id}`);
  }
  // Crear una nueva actividad de vehículo
  createActividadVehiculo(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar una actividad de vehículo
  updateActividadVehiculo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una actividad de vehículo
  deleteActividadVehiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Aprobar actividad por parte del responsable de unidad
  aprobarActividadPorUnidad(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/aprobar-unidad`;
    return this.http.post<any>(url, {});
  }

  // Aprobar actividad por parte del planificador
  aprobarActividadPorPlanificador(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/aprobar-planificador`;
    return this.http.post<any>(url, {});
  }

  // Rechazar actividad (puede ser por parte del responsable de unidad o del planificador)
/*   rechazarActividad(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/rechazar`;
    return this.http.post<any>(url, {});
  } */
  rechazarActividad(id: number, observaciones: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/rechazar`, { observaciones });
  }

/*   modificarActividad(id: number, actividad: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actividad/${id}`, actividad);
  } */
  modificarActividad(id: number): void {
    this.router.navigate([`/modificar-actividad/${id}`]);
  }
  cambiarEstadoActividad(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado`, { estado_aprobacion: estado });
  }
  
  // Método para obtener el PDF
/*   getReporteMensual(mes: number): Observable<Blob> {
    return this.http.get(`http://127.0.0.1:8000/reporte-mensual/reporte-mensual/${mes}`, {
      responseType: 'blob',
    });
  } */
  getReporteMensualConVehiculo(mes: number): Observable<Blob> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    return this.http.get(`http://localhost:8000/reporte-mensual-con-vehiculo/${mes}`, { headers, responseType: 'blob' });
  }
  
  
}

