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
        console.log(data); // Imprimir datos para revisar si 'poa' está presente

        // Guardar todas las actividades en un array aparte para poder filtrar después
        this.todasActividades = data;
        // Filtrar actividades: solo mostrar actividades aprobadas por unidad y pendientes de aprobación por el planificador
        this.actividades = data.filter((actividad: any) => actividad.nivel_aprobacion === 'planificador'); 
        console.log('Actividades filtradas para el planificador:', this.actividades);
      },
      error => {
        this.toastr.error('Error al cargar las actividades', 'Error');
      }
    );
  }
/*   mostrarTodas(): void {
    // Simplemente asigna todas las actividades al array que se muestra en la tabla
    this.actividades = this.todasActividades;
  } */
  mostrarTodas(): void {
    // Filtrar actividades que están pendientes de aprobación por el planificador
    this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.nivel_aprobacion === 'planificador');
  }
  
  mostrarPendientes(): void {
    // Filtrar actividades que están pendientes de aprobación por el planificador
    this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.nivel_aprobacion === 'planificador' && actividad.estado_aprobacion !== 'aprobado'
    );
  }

  mostrarAprobadas(): void {
    // Filtrar actividades que ya fueron aprobadas
    this.actividades = this.todasActividades.filter(
      (actividad: any) => actividad.estado_aprobacion === 'aprobado'
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

  rechazarActividad(id: number): void {
    this.actividadVehiculoService.rechazarActividad(id).subscribe(
      response => {
        this.toastr.success('Actividad rechazada correctamente por el planificador', 'Rechazo');
        this.obtenerActividadesPendientes(); // Recargar actividades pendientes tras rechazar
      },
      error => {
        this.toastr.error('Error al rechazar la actividad', 'Error');
      }
    );
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
