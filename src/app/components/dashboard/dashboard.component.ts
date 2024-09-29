import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuario: any = null;  // Aquí guardaremos los datos del usuario
  esPlanificador: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
        this.usuario = data;
        console.log('Datos del usuario:', this.usuario);

        // Verificar si el rol del usuario es 'planificador'
        this.esPlanificador = this.usuario.rol === 'planificador';
      },
      (error) => {
        console.error('Error obteniendo los datos del usuario:', error);
      }
    );
  }
  irARegistroUsuario() {
    // Redirigir a la página de registro de usuario
    this.router.navigate(['/registrar-usuario']);
  }
  irARegistroUnidad() {
    // Redirigir a la página de registro de usuario
    this.router.navigate(['/registrar-unidad']);
  }
  irARegistroArea() {
    // Redirigir a la página de registro de area
    this.router.navigate(['/registrar-area']);
  }
  irARegistroPoa() {
    // Redirigir a la página de registro de area
    this.router.navigate(['/registrar-poa']);
  }
  irARegistroCoordinacion() {
    // Redirigir a la página de registro de area
    this.router.navigate(['/registrar-coordinacion']);
  }
  irARegistroMunicipio() {
    // Redirigir a la página de registro de area
    this.router.navigate(['/registrar-municipio']);
  }
  irARegistroCentroSalud() {
    // Redirigir a la página de registro de area
    this.router.navigate(['/registrar-centro-salud']);
  }
}

