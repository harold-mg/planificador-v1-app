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

  /* register(user: UserRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  } */

  // Eliminar token al cerrar sesión
  clearToken(): void {
    localStorage.removeItem('token');
  }
  // Obtener los datos del usuario autenticado
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  // Método para obtener el rol del usuario actual
  getUserRole(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/user-role`);
  }
}
