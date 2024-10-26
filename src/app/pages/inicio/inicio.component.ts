import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  usuario: any = null;  // Aquí guardaremos los datos del usuario
  esPlanificador: boolean = false;
  esResponsableUnidad: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
        this.usuario = data;
        console.log('Datos del usuario:', this.usuario);

        // Verificar si el rol del usuario es 'planificador'
        this.esPlanificador = this.usuario.rol === 'planificador';
        // Verificar si el rol del usuario es 'responsable_unidad'
        this.esResponsableUnidad = this.usuario.rol === 'responsable_unidad';
      },
      (error) => {
        console.error('Error obteniendo los datos del usuario:', error);
      }
    );
  }
  
  // Redirigir a la pagina de aprobacion de actividades
  irAprobarPlanificadorConV() {
    this.router.navigate(['/aprobar-convehi-planificador']);
  }
  
  // Redirigir a la página de aprobación de actividades para responsable de unidad
  irAprobarUnidadConV() {
    this.router.navigate(['/aprobar-convehi-unidad']);
  }
}
