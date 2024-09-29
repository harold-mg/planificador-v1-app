import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroSaludService {

  private apiUrl = 'http://localhost:8000/api/centros_salud'; // Reemplaza con tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las coordinaciones
  getCoordinaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coordinaciones`);
  }

  // Obtener municipios por coordinación
  getMunicipiosByCoordinacion(coordinacionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coordinaciones/${coordinacionId}/municipios`);
  }

  // Obtener centros de salud por municipio
  getCentrosDeSaludByMunicipio(municipioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipios/${municipioId}/centros-salud`);
  }
}
