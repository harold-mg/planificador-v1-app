import { Component } from '@angular/core';
import { ActividadSinVehiculoService } from 'src/app/services/actividad-sin-vehiculo.service';

@Component({
  selector: 'app-calendario-sin-vehiculo',
  templateUrl: './calendario-sin-vehiculo.component.html',
  styleUrls: ['./calendario-sin-vehiculo.component.scss']
})
export class CalendarioSinVehiculoComponent {
  unidades: any[] = []; // Lista de unidades y áreas con actividades aprobadas
  diasMes: number[] = []; // Array de días del mes
  actividadesPorUnidad: any = {}; // Objeto para almacenar actividades por unidad y día
  month: number = new Date().getMonth(); // Mes actual
  year: number = new Date().getFullYear(); // Año actual

  constructor(private actividadSinVehiculoService: ActividadSinVehiculoService) {}

  ngOnInit(): void {
    this.generarDiasDelMes();
    this.obtenerActividadesAprobadas();
  }

  generarDiasDelMes(): void {
    const diasEnMes = new Date(this.year, this.month + 1, 0).getDate();
    this.diasMes = Array.from({ length: diasEnMes }, (_, i) => i + 1);
  }

  obtenerActividadesAprobadas(): void {
    this.actividadSinVehiculoService.getActividadesSinVehiculoCompleto().subscribe((data: any) => {
      const actividadesAprobadas = data.filter((actividad: any) => {
        const fechaInicio = new Date(actividad.fecha_inicio);
        const fechaFin = new Date(actividad.fecha_fin);
        return (
          actividad.estado_aprobacion === 'aprobado' &&
          fechaInicio.getFullYear() === this.year &&
          fechaFin.getFullYear() === this.year &&
          fechaInicio.getMonth() === this.month &&
          fechaFin.getMonth() === this.month
        );
      });

      // Limpiar actividades por unidad antes de cargar las nuevas
      this.actividadesPorUnidad = {};

      actividadesAprobadas.forEach((actividad: any) => {
        const unidadArea = actividad.usuario.area?.nombre || actividad.usuario.unidad?.nombre || 'Sin nombre';

        if (!this.actividadesPorUnidad[unidadArea]) {
          this.actividadesPorUnidad[unidadArea] = Array(this.diasMes.length).fill(null);
        }

        const fechaInicio = new Date(actividad.fecha_inicio);
        const fechaFin = new Date(actividad.fecha_fin);

        const inicioDia = fechaInicio.getDate(); // Ajustar índice
        const finDia = fechaFin.getDate(); // Ajustar índice

        for (let dia = inicioDia; dia <= finDia; dia++) {
          if (dia >= 0 && dia < this.diasMes.length) {
            this.actividadesPorUnidad[unidadArea][dia] = {
              poa: actividad.poa?.codigo_poa || 'POA',
              span: dia === inicioDia ? finDia - inicioDia + 1 : 0 // Solo la primera celda tiene el colspan
            };
          }
        }
      });

      this.unidades = Object.keys(this.actividadesPorUnidad);
    });
  }

  nextMonth(): void {
    if (this.month === 11) {
      this.month = 0; // Volver a enero
      this.year++; // Incrementar el año
    } else {
      this.month++;
    }
    this.generarDiasDelMes();
    this.obtenerActividadesAprobadas(); // Obtener actividades del nuevo mes
  }

  previousMonth(): void {
    if (this.month === 0) {
      this.month = 11; // Volver a diciembre
      this.year--; // Decrementar el año
    } else {
      this.month--;
    }
    this.generarDiasDelMes();
    this.obtenerActividadesAprobadas(); // Obtener actividades del nuevo mes
  }
}
