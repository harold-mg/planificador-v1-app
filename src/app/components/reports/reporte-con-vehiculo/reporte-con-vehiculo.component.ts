import { Component } from '@angular/core';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-reporte-con-vehiculo',
  templateUrl: './reporte-con-vehiculo.component.html',
  styleUrls: ['./reporte-con-vehiculo.component.scss']
})
export class ReporteConVehiculoComponent {
  meses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 },
  ];

  // Genera una lista de años, por ejemplo, de 2020 al año actual
  anios: number[] = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  mesSeleccionado: number = new Date().getMonth() + 1; // Inicializar con el mes actual
  yearSeleccionado: number = new Date().getFullYear();  // Año actual
  
  constructor(
    private reportesService: ReportesService
  ){ }
  generarReporteMensual() {
    this.reportesService.getReporteMensualConVehiculo(this.mesSeleccionado, this.yearSeleccionado).subscribe(
      (blob: Blob) => {
        // Crear un enlace para descargar el PDF
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al generar el reporte:', error);
      }
    );
  }
}
