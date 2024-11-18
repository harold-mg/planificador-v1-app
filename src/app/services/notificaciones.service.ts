import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = `${environment.apiUrl}/api/notificaciones`;

  constructor(private http: HttpClient) {}

  // Método para cambiar el estado de la actividad
  cambiarEstadoActividad(id: number, estadoAprobacion: string, observaciones: string | null): Observable<any> {
    const data = {
      estado_aprobacion: estadoAprobacion,
      observaciones: observaciones
    };

    return this.http.post(`${this.apiUrl}/cambiar-estado/${id}`, data);
  }
  // Obtener las notificaciones para el usuario
  getNotificaciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear una notificación
  createNotificacion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getUserNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  // Obtiene las notificaciones no leídas del usuario
  getNotificacionesNoLeidas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/no-leidas`);
  }
  marcarComoLeida(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/marcar-leida/${id}`, {});
  }
}

