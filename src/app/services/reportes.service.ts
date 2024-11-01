import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = `${environment.apiUrl}`; 
  constructor(private http: HttpClient) { }
/*   getReporteMensualConVehiculo(mes: number): Observable<Blob> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    return this.http.get(`${this.apiUrl}/reporte-mensual-con-vehiculo/${mes}`, { headers, responseType: 'blob' });
  } */
  getReporteMensualConVehiculo(mes: number, year: number): Observable<Blob> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    return this.http.get(`${this.apiUrl}/reporte-mensual-con-vehiculo/${mes}/${year}`, { headers, responseType: 'blob' });
}

}
