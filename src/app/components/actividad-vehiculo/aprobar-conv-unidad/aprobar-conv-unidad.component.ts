import { Component, OnInit } from '@angular/core';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service'; // Importa el servicio correcto
import { ToastrService } from 'ngx-toastr'; // Librería para mostrar notificaciones, opcional
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprobar-conv-unidad.component',
  templateUrl: './aprobar-conv-unidad.component.html',
  styleUrls: ['./aprobar-conv-unidad.component.scss']
})
export class AprobarConvUnidadComponent implements OnInit {
  actividades: any[] = [];
  todasActividades: any[] = [];
  unidadId: number = 0; // Aquí deberías obtener el ID de la unidad del usuario actual
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
    this.obtenerUnidadDelUsuarioActual();
    //this.obtenerActividadesPendientes();
  }
  obtenerUnidadDelUsuarioActual(): void {
    this.authService.getUser().subscribe(
      (usuario: any) => {
        if (usuario && usuario.unidad_id) {
          this.unidadId = usuario.unidad_id; // Almacena el ID de la unidad del usuario
          console.log('la unidad es',this.unidadId)
          this.obtenerActividadesPendientes();
        }
      },
      (error) => {
        console.error('Error al obtener el usuario autenticado:', error);
      }
    );
  }
  obtenerActividadesPendientes(): void {
    this.actividadVehiculoService.getActividadesVehiculoCompleto().subscribe(
      (data: any) => {
        //console.log(data); // Imprimir datos para revisar si 'poa' está presente

        // Guardar todas las actividades en un array aparte para poder filtrar después
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
    
    // Calculamos el siguiente mes
    const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1; // Si estamos en diciembre (mes 11), el siguiente mes es enero (mes 0)
    const anioSiguiente = mesSiguiente === 0 ? anioActual + 1 : anioActual; // Si el siguiente mes es enero, el año debe cambiar
  
    // Filtramos las actividades por el mes siguiente y también por la unidad_id
    this.actividades = this.todasActividades.filter((actividad: any) => {
      const fechaInicio = new Date(actividad.fecha_inicio);
      // Filtramos las actividades que sean del mes siguiente y que pertenezcan a la unidad del usuario
      return (
        fechaInicio.getMonth() === mesSiguiente &&
        fechaInicio.getFullYear() === anioSiguiente &&
        (actividad.nivel_aprobacion === 'planificador' || actividad.estado_aprobacion === 'pendiente' 
          || actividad.estado_aprobacion === 'rechazado') &&
        actividad.poa?.unidad_id === this.unidadId
      );
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
      return fechaInicio.getMonth() === mesSiguiente && 
      fechaInicio.getFullYear() === anioSiguiente &&
      actividad.poa?.unidad_id === this.unidadId;
    });
  }
  mostrarTodas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      (actividad.nivel_aprobacion === 'planificador' || actividad.estado_aprobacion === 'pendiente' 
        || actividad.estado_aprobacion === 'rechazado') &&
      actividad.poa?.unidad_id === this.unidadId // Filtra también por unidad
    );
  }
  
  mostrarPendientes(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'unidad' &&
      actividad.estado_aprobacion === 'pendiente' &&
      actividad.poa?.unidad_id === this.unidadId // Filtra también por unidad
    );
  }

  mostrarAprobadas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'planificador' &&
      actividad.estado_aprobacion === 'pendiente' &&
      actividad.poa?.unidad_id === this.unidadId // Filtra también por unidad
    );
  }
  mostrarRechazadas(): void {
    this.actividades = this.filtrarPorMesSiguiente(this.todasActividades).filter((actividad: any) =>
      actividad.nivel_aprobacion === 'unidad' &&
      actividad.estado_aprobacion === 'rechazado' &&
      actividad.poa?.unidad_id === this.unidadId // Filtra también por unidad
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
    this.actividadVehiculoService.aprobarActividadPorUnidad(id).subscribe(
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
  rechazarActividad(id: number): void {
    this.actividadIdParaRechazar = id;
    this.mostrarObservacion = true; // Muestra el formulario para escribir la observación
  }

  rechazarActividadConObservacion(): void {
    if (this.actividadIdParaRechazar && this.observacion) {
      this.actividadVehiculoService.rechazarActividad(this.actividadIdParaRechazar, this.observacion).subscribe(
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
    this.mostrarObservacion = false; // Cerrar el formulario
    this.observacion = ''; // Limpiar la observación
    this.actividadIdParaRechazar = null; // Limpiar la ID de la actividad
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
}
