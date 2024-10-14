import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  areas: any[] = [];  // Variable para almacenar las áreas

  constructor(
    private areaService: AreaService,
    private router: Router) {}

  ngOnInit(): void {
    this.obtenerAreas();
  }

  // Método para obtener las áreas del servicio
  obtenerAreas() {
    this.areaService.getAreas().subscribe(
      (data) => {
        this.areas = data;
      },
      (error) => {
        console.error('Error al obtener las áreas', error);
      }
    );
  }

  editarArea(id: number) {
    this.router.navigate([`/editar-area/${id}`]);
  }

  eliminarArea(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta área?')) {
      this.areaService.deleteArea(id).subscribe(
        () => {
          alert('Área eliminada con éxito');
          this.obtenerAreas();  // Actualizar la lista de áreas
        },
        (error) => {
          console.error('Error al eliminar el área', error);
        }
      );
    }
  }
}
