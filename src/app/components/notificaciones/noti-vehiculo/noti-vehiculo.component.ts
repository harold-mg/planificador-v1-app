import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-noti-vehiculo',
  templateUrl: './noti-vehiculo.component.html',
  styleUrls: ['./noti-vehiculo.component.scss']
})
export class NotiVehiculoComponent {
  actividadesNotificacion: any[] = [];
  mostrarNotificacion: boolean = false;
  cargando: boolean = true;  // Indica si se están cargando las actividades
  usuarioId!: string;
  usuarioRol!: string;

  constructor(
    private ActividadVehiculoService: ActividadVehiculoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioId();
  }

  obtenerUsuarioId(): void {
    this.authService.getUser().subscribe(
      (usuario: any) => {
        this.usuarioId = usuario.id;
        this.usuarioRol = usuario.rol; // Asumiendo que el rol está en la propiedad "rol" del usuario

        // Si el usuario no es "planificador", obtenemos las notificaciones
        if (this.usuarioRol !== 'planificador') {
          this.obtenerActividadesNotificacion();
        } else {
          this.mostrarNotificacion = false; // Ocultar la notificación para el rol "planificador"
          this.cargando = false; // Finalizar la carga para evitar el mensaje de "Cargando actividades..."
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  obtenerActividadesNotificacion(): void {
    this.ActividadVehiculoService.getActividadesConVehiculoPorUsuario(this.usuarioId).subscribe(
      (actividades: any[]) => {
        this.actividadesNotificacion = actividades.filter(
          (actividad: any) => actividad.estado_aprobacion === 'aprobado' || actividad.estado_aprobacion === 'rechazado'
        );
        this.cargando = false;  // Finaliza la carga de actividades
        this.mostrarNotificacion = true;  // Muestra la ventana emergente
      },
      (error) => {
        console.error('Error al obtener las actividades', error);
        this.cargando = false;  // Finaliza la carga en caso de error
      }
    );
  }

  obtenerDescripcionEstado(actividad: any): string {
    if (actividad.estado_aprobacion === 'aprobado') {
      return `Actividad Aprobada: ${actividad.poa.codigo_poa}, Fecha Inicio: ${actividad.fecha_inicio}`;
    } else if (actividad.estado_aprobacion === 'rechazado') {
      const observacion = actividad.observaciones ? actividad.observaciones : 'No disponible';
      return `Actividad Rechazada: ${actividad.poa.codigo_poa}, Observación: ${observacion}`;
    }
    return '';
  }

  cerrarNotificacion(): void {
    this.mostrarNotificacion = false;
  }
}