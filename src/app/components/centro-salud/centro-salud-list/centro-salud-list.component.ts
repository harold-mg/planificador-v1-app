import { Component, OnInit } from '@angular/core';
import { CentroSaludService } from 'src/app/services/centro-salud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro-salud-list',
  templateUrl: './centro-salud-list.component.html',
  styleUrls: ['./centro-salud-list.component.scss']
})
export class CentroSaludListComponent implements OnInit {
  centrosSalud: any[] = [];

  constructor(
    private centroSaludService: CentroSaludService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerCentrosSalud();
  }

  obtenerCentrosSalud() {
    this.centroSaludService.getCentrosSalud().subscribe(
      (data) => {
        this.centrosSalud = data;
      },
      (error) => {
        console.error('Error al obtener los centros de salud', error);
      }
    );
  }

  editarCentroSalud(id: number) {
    this.router.navigate([`/editar-centro-salud/${id}`]);
  }

  eliminarCentroSalud(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este centro de salud?')) {
      this.centroSaludService.deleteCentroSalud(id).subscribe(
        () => {
          alert('Centro de salud eliminado con éxito');
          this.obtenerCentrosSalud();  // Actualizar la lista de centros de salud
        },
        (error) => {
          console.error('Error al eliminar el centro de salud', error);
        }
      );
    }
  }
}
