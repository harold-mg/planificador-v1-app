import { Component, OnInit } from '@angular/core';
import { PoaService } from 'src/app/services/poa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poa-list',
  templateUrl: './poa-list.component.html',
  styleUrls: ['./poa-list.component.scss']
})
export class PoaListComponent implements OnInit {
  poas: any[] = [];  // Variable para almacenar las POAs

  constructor(
    private poaService: PoaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPoas();
  }

  // Método para obtener las POAs del servicio
  obtenerPoas() {
    this.poaService.getPoas().subscribe(
      (data) => {
        this.poas = data;
      },
      (error) => {
        console.error('Error al obtener los POAs', error);
      }
    );
  }

  // Método para redirigir a la edición del POA
  editarPoa(id: number) {
    this.router.navigate([`editar-poa/${id}`]);
  }

  // Método para eliminar un POA
  eliminarPoa(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este POA?')) {
      this.poaService.deletePoa(id).subscribe(
        () => {
          alert('POA eliminado con éxito');
          this.obtenerPoas();  // Actualizar la lista de POAs
        },
        (error) => {
          console.error('Error al eliminar el POA', error);
        }
      );
    }
  }
}
