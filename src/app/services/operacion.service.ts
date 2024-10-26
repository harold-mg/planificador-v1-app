import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class OperacionService {
  private apiUrl = `${environment.apiUrl}/api/operaciones`; // URL base para las operaciones

  constructor(private http: HttpClient) {}

  // Método para cargar POAs
  loadPoas(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/poas`);
  }

  // Método para registrar una operación
  registerOperacion(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

