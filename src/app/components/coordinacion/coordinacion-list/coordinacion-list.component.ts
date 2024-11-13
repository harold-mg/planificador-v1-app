import { Component, OnInit } from '@angular/core';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinacion-list',
  templateUrl: './coordinacion-list.component.html',
  styleUrls: ['./coordinacion-list.component.scss']
})
export class CoordinacionListComponent implements OnInit {
  coordinaciones: any[] = [];  // Variable para almacenar las coordinaciones

  constructor(
    private coordinacionService: CoordinacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerCoordinaciones();
  }

  // Método para obtener las coordinaciones del servicio
  obtenerCoordinaciones() {
    this.coordinacionService.getCoordinaciones().subscribe(
      (data) => {
        this.coordinaciones = data;
      },
      (error) => {
        console.error('Error al obtener las coordinaciones', error);
      }
    );
  }

  // Método para redirigir a la edición de la coordinación
  editarCoordinacion(id: number) {
    this.router.navigate([`editar-coordinacion/${id}`]);
  }

  // Método para eliminar una coordinación
  eliminarCoordinacion(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta coordinación?')) {
      this.coordinacionService.deleteCoordinacion(id).subscribe(
        () => {
          alert('Coordinación eliminada con éxito');
          this.obtenerCoordinaciones();  // Actualizar la lista de coordinaciones
        },
        (error) => {
          console.error('Error al eliminar la coordinación', error);
        }
      );
    }
  }
}
