import { Component, OnInit } from '@angular/core';
import { MunicipioService } from 'src/app/services/municipio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-list.component.scss']
})
export class MunicipioListComponent implements OnInit {
  municipios: any[] = [];  // Variable para almacenar los municipios

  constructor(
    private municipioService: MunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerMunicipios();
  }

  // Método para obtener los municipios del servicio
  obtenerMunicipios() {
    this.municipioService.getMunicipios().subscribe(
      (data) => {
        this.municipios = data;
      },
      (error) => {
        console.error('Error al obtener los municipios', error);
      }
    );
  }

  // Método para redirigir a la edición del municipio
  editarMunicipio(id: number) {
    this.router.navigate([`/editar-municipio/${id}`]);
  }

  // Método para eliminar un municipio
  eliminarMunicipio(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este municipio?')) {
      this.municipioService.deleteMunicipio(id).subscribe(
        () => {
          alert('Municipio eliminado con éxito');
          this.obtenerMunicipios();  // Actualizar la lista de municipios
        },
        (error) => {
          console.error('Error al eliminar el municipio', error);
        }
      );
    }
  }
}
