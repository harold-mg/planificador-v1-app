import { Component, OnInit } from '@angular/core';
import { OperacionService } from 'src/app/services/operacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operaciones-list',
  templateUrl: './operaciones-list.component.html',
  styleUrls: ['./operaciones-list.component.scss']
})
export class OperacionesListComponent implements OnInit {
  operaciones: any[] = []; // Aquí se almacenarán las operaciones obtenidas de la API

  constructor(
    private operacionService: OperacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOperaciones(); // Cargar las operaciones cuando el componente se inicializa
  }

  // Método para cargar todas las operaciones desde el servicio
  loadOperaciones() {
    this.operacionService.loadOperaciones().subscribe(
      (data) => {
        this.operaciones = data; // Asignar las operaciones obtenidas a la variable
      },
      (error) => {
        console.error('Error al cargar las operaciones', error);
      }
    );
  }

  // Método para eliminar una operación
  eliminarOperacion(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta operación?')) {
      this.operacionService.deleteOperacion(id).subscribe(
        () => {
          alert('Operación eliminada con éxito');
          this.loadOperaciones(); // Recargar la lista de operaciones después de eliminar
        },
        (error) => {
          console.error('Error al eliminar la operación', error);
        }
      );
    }
  }

  // Método para redirigir a la pantalla de edición de la operación
  editarOperacion(id: number) {
    this.router.navigate([`/editar-operaciones/${id}`]);
  }
}
