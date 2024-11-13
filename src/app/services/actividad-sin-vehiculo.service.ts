import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActividadSinVehiculoService {
  private apiUrl = `${environment.apiUrl}/api/actividad_sin_vehiculos`;
  router: any;
  constructor(private http: HttpClient) { }
  getActividadesVehiculo(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  getActividadesSinVehiculoCompleto(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/actividad_sin_vehiculos_poa`).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  getActividadVehiculoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  createActividadSinVehiculo(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  updateActividadVehiculo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  deleteActividadVehiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  aprobarActividadPorUnidad(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/aprobar-unidad`, {}).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

/*   aprobarActividadPorPlanificador(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/aprobar-planificador`, {}).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  } */
  aprobarActividadPorPlanificador(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/aprobar-planificador`;
    return this.http.post<any>(url, {});
  }
/*   rechazarActividad(id: number, observaciones: string, tipo: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/${tipo}/rechazar`;
    return this.http.put<any>(url, { observaciones }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  } */
  rechazarActividad(id: number, observaciones: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/rechazar`, { observaciones });
  }
  getReporteMensualConVehiculo(mes: number): Observable<Blob> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    return this.http.get(`${environment.apiUrl}/reporte-mensual-con-vehiculo/${mes}`, { headers, responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error al obtener el reporte:', error);
        return throwError(error);
      })
    );
  }
    getActividadesSinVehiculo(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}`);
    }

/*     aprobarActividadPorPlanificador(id: number): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/aprobar/${id}`, {});
    } */

    /* rechazarActividad(id: number, observacion: string): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/rechazar/${id}`, { observacion });
    } */

    cambiarEstadoActividad(id: number, estado: string): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}/estado`, { estado_aprobacion: estado });
    }
}