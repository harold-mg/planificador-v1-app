import { Component } from '@angular/core';
import { ActividadVirtualService } from 'src/app/services/actividad-virtual.service';

@Component({
  selector: 'app-calendario-virtual',
  templateUrl: './calendario-virtual.component.html',
  styleUrls: ['./calendario-virtual.component.scss']
})
export class CalendarioVirtualComponent {
  unidades: any[] = []; // Lista de unidades y áreas con actividades aprobadas
  diasMes: number[] = []; // Array de días del mes
  actividadesPorUnidad: any = {}; // Objeto para almacenar actividades por unidad y día
  month: number = new Date().getMonth(); // Mes actual
  year: number = new Date().getFullYear(); // Año actual

  constructor(private atividadVirtualService: ActividadVirtualService) {}

  ngOnInit(): void {
    this.generarDiasDelMes();
    this.obtenerActividadesAprobadas();
  }

  generarDiasDelMes(): void {
    const diasEnMes = new Date(this.year, this.month + 1, 0).getDate();
    this.diasMes = Array.from({ length: diasEnMes }, (_, i) => i + 1);
  }

  obtenerActividadesAprobadas(): void {
    this.atividadVirtualService.getActividadesVirtualCompleto().subscribe((data: any) => {
      // Filtrar actividades aprobadas en el mes y año actuales
      const actividadesAprobadas = data.filter((actividad: any) => {
        const fecha = new Date(actividad.fecha);
        return (
          actividad.estado_aprobacion === 'aprobado' &&
          fecha.getFullYear() === this.year &&
          fecha.getMonth() === this.month
        );
      });

      // Limpiar actividades por unidad antes de cargar las nuevas
      this.actividadesPorUnidad = {};

      actividadesAprobadas.forEach((actividad: any) => {
        const unidadArea = actividad.usuario.area?.nombre || actividad.usuario.unidad?.nombre || 'Sin nombre';

        if (!this.actividadesPorUnidad[unidadArea]) {
          this.actividadesPorUnidad[unidadArea] = Array(this.diasMes.length).fill(null);
        }

        const fecha = new Date(actividad.fecha);
        const dia = fecha.getDate(); // Obtener el día de la actividad

        // Asegurarnos de que el día esté dentro de los días del mes
        if (dia > 0 && dia <= this.diasMes.length) {
          this.actividadesPorUnidad[unidadArea][dia - 1] = { // Restamos 1 porque el índice del array empieza en 0
            poa: actividad.poa?.codigo_poa || 'POA'
          };
        }
      });

      this.unidades = Object.keys(this.actividadesPorUnidad); // Listar las unidades disponibles
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
