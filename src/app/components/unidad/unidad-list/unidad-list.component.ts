import { Component, OnInit } from '@angular/core';
import { UnidadService } from 'src/app/services/unidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.scss']
})
export class UnidadListComponent implements OnInit {
  unidades: any[] = [];  // Variable para almacenar las unidades

  constructor(
    private unidadService: UnidadService,
    private router: Router) {}

  ngOnInit(): void {
    this.obtenerUnidades();
  }

  // Método para obtener las unidades del servicio
  obtenerUnidades() {
    this.unidadService.getUnidades().subscribe(
      (data) => {
        this.unidades = data;
      },
      (error) => {
        console.error('Error al obtener las unidades', error);
      }
    );
  }
  editarUnidad(id: number) {
    this.router.navigate([`/editar-unidad/${id}`]);
  }
  eliminarUnidad(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta unidad?')) {
      this.unidadService.deleteUnidad(id).subscribe(
        () => {
          alert('Unidad eliminada con éxito');
          this.obtenerUnidades();  // Actualizar la lista de unidades
        },
        (error) => {
          console.error('Error al eliminar la unidad', error);
        }
      );
    }
  }
  
}
