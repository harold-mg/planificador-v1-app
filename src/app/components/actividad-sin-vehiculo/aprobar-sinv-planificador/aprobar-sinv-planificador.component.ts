import { Component, OnInit } from '@angular/core';
import { ActividadSinVehiculoService } from 'src/app/services/actividad-sin-vehiculo.service'; // Servicio para actividades sin vehículo
import { ToastrService } from 'ngx-toastr'; // Librería para mostrar notificaciones
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprobar-sinv-planificador',
  templateUrl: './aprobar-sinv-planificador.component.html',
  styleUrls: ['./aprobar-sinv-planificador.component.scss']
})
export class AprobarSinVPlanificadorComponent implements OnInit {
  actividades: any[] = [];
  todasActividades: any[] = [];
  mostrarObservacion: boolean = false; // Control para el formulario emergente
  observacion: string = ''; // Texto de la observación para rechazar
  actividadIdParaRechazar: number | null = null; // ID de la actividad a rechazar

  constructor(
    private actividadSinVehiculoService: ActividadSinVehiculoService, // Servicio para actividades sin vehículo
    private authService: AuthService,
    private toastr: ToastrService, // Para notificaciones
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerActividadesPendientes();
  }

  obtenerActividadesPendientes(): void {
    this.actividadSinVehiculoService.getActividadesSinVehiculoCompleto().subscribe(
      (data: any) => {
        console.log(data); 
        this.todasActividades = data;
        this.filtrarActividadesPorMesSiguiente();
      },
      error => {
        this.toastr.error('Error al cargar las actividades', 'Error');
      }
    );
  }

  filtrarActividadesPorMesSiguiente(): void {
    const mesActual = new Date().getMonth(); // Obtiene el mes actual (0-11)
    const anioActual = new Date().getFullYear(); // Obtiene el año actual

    const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1; // Si estamos en diciembre (mes 11), el siguiente mes es enero (mes 0)
    const anioSiguiente = mesSiguiente === 0 ? anioActual + 1 : anioActual; // Si el siguiente mes es enero, el año debe cambiar

    this.actividades = this.todasActividades.filter((actividad: any) => {
      const fechaInicio = new Date(actividad.fecha_inicio);
      return fechaInicio.getMonth() === mesSiguiente && 
      fechaInicio.getFullYear() === anioSiguiente &&
      actividad.nivel_aprobacion === 'planificador';
    });

    console.log('Actividades para el mes siguiente:', this.actividades);
  }
  filtrarPorMesSiguiente(actividades: any[]): any[] {
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();
    const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1;
    const anioSiguiente = mesSiguiente === 0 ? anioActual + 1 : anioActual;
  
    return actividades.filter((actividad: any) => {
      const fechaInicio = new Date(actividad.fecha_inicio);
      return fechaInicio.getMonth() === mesSiguiente && fechaInicio.getFullYear() === anioSiguiente;
    });
  }
  mostrarTodas(): void {
    /* this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.nivel_aprobacion === 'planificador'); */
      this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
        actividad.nivel_aprobacion === 'planificador'
      );
  }
  mostrarPendientes(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'planificador' && actividad.estado_aprobacion === 'pendiente'
    );
  }

  mostrarAprobadas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter(
      (actividad: any) => actividad.estado_aprobacion === 'aprobado'
    );
  }

  mostrarRechazadas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter(
      (actividad: any) => actividad.estado_aprobacion === 'rechazado'
    );
  }
  obtenerDescripcionOperacion(actividad: any): string {
    const operacion = actividad.poa?.operaciones?.find((op: { id: any; }) => op.id == actividad.detalle_operacion);
    return operacion ? operacion.descripcion : 'Sin Operación';
  }
  aprobarActividad(id: number): void {
    this.actividadSinVehiculoService.aprobarActividadPorPlanificador(id).subscribe(
      response => {
        this.toastr.success('Actividad aprobada correctamente por el planificador', 'Aprobación');
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
      this.actividadSinVehiculoService.rechazarActividad(this.actividadIdParaRechazar, this.observacion).subscribe(
        response => {
          this.toastr.success('Actividad rechazada correctamente', 'Rechazo');
          this.obtenerActividadesPendientes();
          this.mostrarObservacion = false;
          this.observacion = '';
          this.actividadIdParaRechazar = null;
        },
        error => {
          this.toastr.error('Error al rechazar la actividad', 'Error');
        }
      );
    }
  }

  ponerPendiente(id: number): void {
    this.actividadSinVehiculoService.cambiarEstadoActividad(id, 'pendiente').subscribe(
      response => {
        this.toastr.success('Estado de la actividad actualizado a Pendiente', 'Éxito');
        this.obtenerActividadesPendientes(); // Recargar las actividades para reflejar el cambio
      },
      error => {
        this.toastr.error('Error al actualizar el estado', 'Error');
      }
    );
  }

  cancelarRechazo(): void {
    this.mostrarObservacion = false;
    this.observacion = '';
    this.actividadIdParaRechazar = null;
  }

  obtenerEstado(actividad: any): string {
    if (actividad.estado_aprobacion === 'aprobado') {
      return 'Aprobado';
    } else if (actividad.estado_aprobacion === 'rechazado') {
      return 'Rechazado';
    }
    return 'Pendiente'; // Si no está ni aprobado ni rechazado, se muestra como pendiente
  }

  modificarActividad(id: number): void {
    this.router.navigate([`/editar-sinv/${id}`]);
  }
}