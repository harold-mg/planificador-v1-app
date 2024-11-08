import { Component, OnInit } from '@angular/core';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service'; // Importa el servicio correcto
import { ToastrService } from 'ngx-toastr'; // Librería para mostrar notificaciones, opcional
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aprobar-conv-unidad.component',
  templateUrl: './aprobar-conv-unidad.component.html',
  styleUrls: ['./aprobar-conv-unidad.component.scss']
})
export class AprobarConvUnidadComponent implements OnInit {
  actividades: any[] = [];
  unidadId: number = 0; // Aquí deberías obtener el ID de la unidad del usuario actual

  constructor(
    private actividadVehiculoService: ActividadVehiculoService, // Usa el servicio correcto
    private authService: AuthService,
    private toastr: ToastrService, // Para notificaciones
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
  obtenerActividadesPendientes(): void {
    this.actividadVehiculoService.getActividadesVehiculoCompleto().subscribe(
      (data: any) => {
        console.log(data); // Imprimir datos para revisar si 'poa' está presente
  
        // Filtrar actividades: solo mostrar actividades de responsables de área que pertenecen a la unidad actual
        this.actividades = data.filter((actividad: any) => {
          // Asegurarse de que solo las actividades de la unidad actual se muestren
          const esDeUnidadActual = actividad.usuario?.unidad_id === this.unidadId;
          const esResponsableArea = actividad.usuario?.rol === 'responsable_area';
          return esDeUnidadActual && esResponsableArea;
        });
  
        console.log('Actividades filtradas:', this.actividades);
      },
      error => {
        this.toastr.error('Error al cargar las actividades', 'Error');
      }
    );
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

  rechazarActividad(id: number): void {
    const observacion = "Razón del rechazo";
    this.actividadVehiculoService.rechazarActividad(id, observacion).subscribe(
      response => {
        this.toastr.success('Actividad rechazada correctamente', 'Rechazo');
        this.obtenerActividadesPendientes(); // Recargar actividades pendientes tras rechazar
      },
      error => {
        this.toastr.error('Error al rechazar la actividad', 'Error');
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
  
}
