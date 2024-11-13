import { Component, OnInit } from '@angular/core';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service'; // Importa el servicio correcto
import { ToastrService } from 'ngx-toastr'; // Librería para mostrar notificaciones, opcional
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprobar-planificador',
  templateUrl: './aprobar-conv-planificador.component.html',
  styleUrls: ['./aprobar-conv-planificador.component.scss']
})
export class AprobarConvPlanificadorComponent implements OnInit {
  actividades: any[] = [];
  todasActividades: any[] = [];
  mostrarObservacion: boolean = false; // Control para el formulario emergente
  observacion: string = ''; // Texto de la observación para rechazar
  actividadIdParaRechazar: number | null = null; // ID de la actividad a rechazar
  constructor(
    private actividadVehiculoService: ActividadVehiculoService, // Usa el servicio correcto
    private authService: AuthService,
    private toastr: ToastrService, // Para notificaciones
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerActividadesPendientes();
  }

  obtenerActividadesPendientes(): void {
    this.actividadVehiculoService.getActividadesVehiculoCompleto().subscribe(
      (data: any) => {
        //console.log(data); // Imprimir datos para revisar si 'poa' está presente

        // Guardar todas las actividades en un array aparte para poder filtrar después
        this.todasActividades = data;
        // Filtrar actividades: solo mostrar actividades aprobadas por unidad y pendientes de aprobación por el planificador
        //this.actividades = data.filter((actividad: any) => actividad.nivel_aprobacion === 'planificador'); 
        this.filtrarActividadesPorMesSiguiente();
        //console.log('Actividades filtradas para el planificador:', this.actividades);
      },
      error => {
        this.toastr.error('Error al cargar las actividades', 'Error');
      }
    );
  }
  filtrarActividadesPorMesSiguiente(): void {
    const mesActual = new Date().getMonth(); // Obtiene el mes actual (0-11)
    const anioActual = new Date().getFullYear(); // Obtiene el año actual
    
    // Calculamos el siguiente mes
    const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1; // Si estamos en diciembre (mes 11), el siguiente mes es enero (mes 0)
    const anioSiguiente = mesSiguiente === 0 ? anioActual + 1 : anioActual; // Si el siguiente mes es enero, el año debe cambiar

    // Filtramos las actividades por el mes siguiente
    this.actividades = this.todasActividades.filter((actividad: any) => {
      // Convertimos la fecha de inicio a un objeto Date
      const fechaInicio = new Date(actividad.fecha_inicio);
      
      // Verificamos si la actividad es del mes siguiente
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
/*   mostrarTodas(): void {
    // Simplemente asigna todas las actividades al array que se muestra en la tabla
    this.actividades = this.todasActividades;
  } */
  mostrarTodas(): void {
    // Filtrar actividades que están pendientes de aprobación por el planificador
/*     this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.nivel_aprobacion === 'planificador'); */
      this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
        actividad.nivel_aprobacion === 'planificador'
      );
  }
  
  mostrarPendientes(): void {
    // Filtrar actividades que están pendientes de aprobación por el planificador
    /* this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.nivel_aprobacion === 'planificador' && actividad.estado_aprobacion === 'pendiente'
    ); */
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'planificador' && actividad.estado_aprobacion === 'pendiente'
    );
  }

  mostrarAprobadas(): void {
    // Filtrar actividades que ya fueron aprobadas
    /* this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.estado_aprobacion === 'aprobado'
    ); */
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter(
      (actividad: any) => actividad.estado_aprobacion === 'aprobado'
    );
  }
  mostrarRechazadas(): void {
    /* this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.estado_aprobacion === 'rechazado'
    ); */
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter(
      (actividad: any) => actividad.estado_aprobacion === 'rechazado' && actividad.nivel_aprobacion === 'planificador'
    );
  }
  obtenerDescripcionOperacion(actividad: any): string {
    const operacion = actividad.poa?.operaciones?.find((op: { id: any; }) => op.id == actividad.detalle_operacion);
    return operacion ? operacion.descripcion : 'Sin Operación';
  }
  aprobarActividad(id: number): void {
    this.actividadVehiculoService.aprobarActividadPorPlanificador(id).subscribe(
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
      this.actividadVehiculoService.rechazarActividad(this.actividadIdParaRechazar, this.observacion).subscribe(
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
    // Llamar al servicio para actualizar el estado
    this.actividadVehiculoService.cambiarEstadoActividad(id, 'pendiente').subscribe(
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
    // Nuevo método para modificar la actividad
/*     modificarActividad(actividad: any): void {
      this.router.navigate(['/editar-conv', actividad.id]); // Redirige a la página de edición
    } */
    modificarActividad(id: number): void {
      this.router.navigate([`/editar-conv/${id}`]);
    }
    
  
}
