import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  usuario: any = null;  // Aquí guardaremos los datos del usuario
  esPlanificador: boolean = false;
  esResponsableUnidad: boolean = false;
  mostrarNotificaciones: boolean = false;

  constructor(private authService: AuthService, 
    private router: Router,
    private backgroundService: BackgroundService) {}

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
    this.verificarNotificaciones();
  }
   // Método para determinar si mostrar las notificaciones
   verificarNotificaciones(): void {
    // Lógica para determinar si mostrar las notificaciones
    this.authService.getUser().subscribe(usuario => {
      // Aquí puedes usar cualquier lógica para determinar si hay notificaciones
      // Por ejemplo, puedes revisar si el usuario tiene actividades pendientes o notificaciones.
      // Como ejemplo básico, setear a `true` si tiene notificaciones
      this.mostrarNotificaciones = true; // o cualquier lógica que determines
    });
  }
  // Redirigir a la pagina de aprobacion de actividades
  irAprobarPlanificadorConV() {
    this.router.navigate(['/aprobar-convehi-planificador']);
  }
  
  // Redirigir a la página de aprobación de actividades para responsable de unidad
  irAprobarUnidadConV() {
    this.router.navigate(['/aprobar-convehi-unidad']);
  }
  // Cambiar a fondo animado
  setFondoAnimado(): void {
    this.backgroundService.setBackground('animated');
  }

  // Cambiar a fondo estático
  setFondoEstatico(): void {
    this.backgroundService.setBackground('static');
  }

  // Cambiar a fondo por defecto
  setFondoDefault(): void {
    this.backgroundService.setBackground('default');
  }
}
