import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Asegúrate de configurar esta URL en tu archivo de entorno

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(nombre_usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { nombre_usuario, password });
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // Guardar token en localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener token de localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar token al cerrar sesión
  clearToken(): void {
    localStorage.removeItem('token');
  }
}
