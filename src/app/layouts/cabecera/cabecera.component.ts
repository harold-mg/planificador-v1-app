import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que el AuthService está importado

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  menuVisible: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  cerrarSesion() {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Sesión cerrada:', response);
        this.authService.removeToken(); // Elimina el token del local storage o donde lo estés almacenando
        this.router.navigate(['/login']); // Redirige al login
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
  scrollToActividades() {
    const actividadesSection = document.getElementById('actividades-section');
    if (actividadesSection) {
      actividadesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToInicio() {
    this.router.navigate(['/inicio']).then(() => {
      window.scrollTo(0, 0); // Desplazarse a la parte superior
    });
  }
}

