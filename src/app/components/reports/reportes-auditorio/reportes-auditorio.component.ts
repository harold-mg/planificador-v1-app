import { Component } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes-auditorio',
  templateUrl: './reportes-auditorio.component.html',
  styleUrls: ['./reportes-auditorio.component.scss']
})
export class ReportesAuditorioComponent {
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
  mostrarSeleccion() {
    console.log('Mes seleccionado:', this.mesSeleccionado);
    console.log('Año seleccionado:', this.yearSeleccionado);
  }
  generarReporteMensual() {
    console.log("Mes seleccionado:", this.mesSeleccionado);
    console.log("Año seleccionado:", this.yearSeleccionado);
  
    this.reportesService.getReporteMensualAuditorio(this.mesSeleccionado, this.yearSeleccionado).subscribe(
      (blob: Blob) => {
        // Crear un enlace para descargar el PDF
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al generar el reporte:', error);
        if (error.error) {
          console.error('Error detallado:', error.error);  // Imprime el mensaje de error detallado
        }
        alert('Hubo un error al generar el reporte. Por favor, inténtelo de nuevo más tarde. QUIZAS NO TIENE ACTIVIDAES APROBADAS PARA ESTE MES');
      }
    );
  }
}
