import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ActividadExternaService {

  private apiUrl = `${environment.apiUrl}/api/actividad_externas`; // Asegúrate de que esta URL esté correctamente configurada
  router: any;

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades de externa
  getActividadesExterna(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  // Obtener actividades con información adicional de POA
  getActividadesExternaCompleto(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/actividad_externas_poa`);
  }

  // Obtener una actividad de externa por ID
  getActividadExternaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva actividad de externa
  createActividadExterna(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar una actividad de externa
  updateActividadExterna(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una actividad de externa
  deleteActividadExterna(id: number): Observable<any> {
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
  rechazarActividad(id: number, observaciones: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/rechazar`, { observaciones });
  }

  // Modificar actividad, redirige al formulario de modificación
  modificarActividad(id: number): void {
    this.router.navigate([`/modificar-actividad/${id}`]);
  }

  // Cambiar el estado de aprobación de la actividad
  cambiarEstadoActividad(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado`, { estado_aprobacion: estado });
  }

}
