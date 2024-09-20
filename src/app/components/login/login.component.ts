import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nombre_usuario: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /* login() {
    this.authService.login(this.nombre_usuario, this.password).subscribe(
      (response) => {
        console.log(response.message);
        this.authService.setToken(response.access_token);
        this.router.navigate(['/dashboard']); // Redirigir después de un login exitoso
      },
      (error) => {
        alert('Credenciales incorrectas');
      }
    );
  } */
    login() {
      console.log('Intentando iniciar sesión con:', {
        nombre_usuario: this.nombre_usuario,
        password: this.password
      });
  
      this.authService.login(this.nombre_usuario, this.password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
          this.authService.setToken(response.access_token);
          this.router.navigate(['/dashboard']); // Redirigir después de un login exitoso
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
          alert('Credenciales incorrectas');
        }
      );
    }
}
