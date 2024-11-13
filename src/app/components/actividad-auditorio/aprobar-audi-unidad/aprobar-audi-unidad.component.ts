import { Component, OnInit } from '@angular/core';
import { ActividadAuditorioService } from 'src/app/services/actividad-auditorio.service';
import { ToastrService } from 'ngx-toastr'; // Librería para mostrar notificaciones, opcional
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprobar-audi-unidad',
  templateUrl: './aprobar-audi-unidad.component.html',
  styleUrls: ['./aprobar-audi-unidad.component.scss']
})
export class AprobarAudiUnidadComponent implements OnInit {
  actividades: any[] = [];
  todasActividades: any[] = [];
  unidadId: number = 0; // Aquí deberías obtener el ID de la unidad del usuario actual
  mostrarObservacion: boolean = false; // Control para el formulario emergente
  observacion: string = ''; // Texto de la observación para rechazar
  actividadIdParaRechazar: number | null = null; // ID de la actividad a rechazar

  constructor(
    private actividadAuditorioService: ActividadAuditorioService, // Usa el servicio correcto
    private authService: AuthService,
    private toastr: ToastrService, // Para notificaciones
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUnidadDelUsuarioActual();
    this.obtenerActividadesPendientes();
  }

  obtenerUnidadDelUsuarioActual(): void {
    this.authService.getUser().subscribe(
      (usuario: any) => {
        if (usuario && usuario.unidad_id) {
          this.unidadId = usuario.unidad_id; // Almacena el ID de la unidad del usuario
        }
      },
      (error) => {
        console.error('Error al obtener el usuario autenticado:', error);
      }
    );
  }

  obtenerActividadesPendientes(): void {
    this.actividadAuditorioService.getActividadesAuditorioCompleto().subscribe(
      (data: any) => {
        this.todasActividades = data;
        this.filtrarActividadesPorMesSiguiente();
      },
      error => {
        this.toastr.error('Error al cargar las actividades', 'Error');
      }
    );
  }

  filtrarActividadesPorMesSiguiente(): void {
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();
    const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1;
    const anioSiguiente = mesSiguiente === 0 ? anioActual + 1 : anioActual;

    this.actividades = this.todasActividades.filter((actividad: any) => {
      const fechaInicio = new Date(actividad.fecha);
      return fechaInicio.getMonth() === mesSiguiente &&
        fechaInicio.getFullYear() === anioSiguiente &&
        actividad.nivel_aprobacion === 'unidad' && actividad.estado_aprobacion === 'pendiente';
    });
  }
  filtrarPorMesSiguiente(actividades: any[]): any[] {
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();
    const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1;
    const anioSiguiente = mesSiguiente === 0 ? anioActual + 1 : anioActual;
  
    return actividades.filter((actividad: any) => {
      const fechaInicio = new Date(actividad.fecha);
      return fechaInicio.getMonth() === mesSiguiente && fechaInicio.getFullYear() === anioSiguiente;
    });
  }
  // Métodos de filtrado
  mostrarTodas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'planificador' || actividad.estado_aprobacion === 'pendiente'
    );
  }

  mostrarPendientes(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'unidad' && actividad.estado_aprobacion === 'pendiente'
    );
  }

  mostrarAprobadas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter(
      (actividad: any) => actividad.nivel_aprobacion === 'planificador' && actividad.estado_aprobacion === 'pendiente'
    );
  }

  mostrarRechazadas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter(
      (actividad: any) => actividad.nivel_aprobacion === 'unidad' && actividad.estado_aprobacion === 'rechazado'
    );
  }

  obtenerDescripcionOperacion(actividad: any): string {
    const operacion = actividad.poa?.operaciones?.find((op: { id: any; }) => op.id == actividad.detalle_operacion);
    return operacion ? operacion.descripcion : 'Sin Operación';
  }

  obtenerUnidadOArea(actividad: any): string {
    if (actividad.usuario) {
      if (actividad.usuario.rol === 'responsable_area') {
        return `${actividad.usuario.area?.nombre || 'Sin nombre de área'}`;
      } else if (actividad.usuario.rol === 'responsable_unidad') {
        return `${actividad.usuario.unidad?.nombre || 'Sin nombre de unidad'}`;
      }
    }
    return 'Sin Unidad o Área';
  }

  aprobarActividad(id: number): void {
    this.actividadAuditorioService.aprobarActividadPorUnidad(id).subscribe(
      response => {
        this.toastr.success('Actividad aprobada correctamente', 'Aprobación');
        this.obtenerActividadesPendientes(); // Recargar actividades pendientes tras aprobar
      },
      error => {
        this.toastr.error('Error al aprobar la actividad', 'Error');
      }
    );
  }

  abrirFormularioRechazo(id: number): void {
    this.mostrarObservacion = true;
    this.actividadIdParaRechazar = id;
  }

  rechazarActividadConObservacion(): void {
    if (this.actividadIdParaRechazar && this.observacion) {
      this.actividadAuditorioService.rechazarActividad(this.actividadIdParaRechazar, this.observacion).subscribe(
        response => {
          this.toastr.success('Actividad rechazada correctamente', 'Rechazo');
          this.obtenerActividadesPendientes(); // Recargar actividades tras rechazar
          this.mostrarObservacion = false; // Cerrar el formulario
          this.observacion = ''; // Limpiar la observación
          this.actividadIdParaRechazar = null; // Limpiar la ID de la actividad
        },
        error => {
          this.toastr.error('Error al rechazar la actividad', 'Error');
        }
      );
    }
  }

  cancelarRechazo(): void {
    this.mostrarObservacion = false;
    this.observacion = '';
    this.actividadIdParaRechazar = null;
  }

  ponerPendiente(id: number): void {
    this.actividadAuditorioService.cambiarEstadoActividad(id, 'pendiente').subscribe(
      response => {
        this.toastr.success('Estado de la actividad actualizado a Pendiente', 'Éxito');
        this.obtenerActividadesPendientes(); // Recargar las actividades para reflejar el cambio
      },
      error => {
        this.toastr.error('Error al actualizar el estado', 'Error');
      }
    );
  }

  obtenerEstado(actividad: any): string {
    if (actividad.nivel_aprobacion === 'planificador') {
      return 'Aprobado por Unidad';
    } else if (actividad.estado_aprobacion === 'rechazado') {
      return 'Rechazado por Unidad';
    }
    return 'Pendiente'; // Si no está ni aprobado ni rechazado, se muestra como pendiente
  }

  modificarActividad(id: number): void {
    this.router.navigate([`/editar-conv/${id}`]);
  }

  // Función para convertir hora en formato HH:mm:ss a un objeto Date
  getDateFromTime(time: string): Date {
    const today = new Date();
    const timeParts = time.split(':');
    today.setHours(Number(timeParts[0]), Number(timeParts[1]), Number(timeParts[2] || 0), 0); // Establece la hora en el objeto Date
    return today;
  }
}
