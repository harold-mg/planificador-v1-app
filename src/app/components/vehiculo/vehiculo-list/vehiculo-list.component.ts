import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.scss']
})
export class VehiculoListComponent implements OnInit {
  vehiculos: any[] = [];  // Variable para almacenar los vehículos

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  // Método para obtener los vehículos del servicio
  obtenerVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(
      (data) => {
        this.vehiculos = data;
      },
      (error) => {
        console.error('Error al obtener los vehículos', error);
      }
    );
  }

  // Método para redirigir a la edición del vehículo
  editarVehiculo(id: number) {
    this.router.navigate([`/editar-vehiculo/${id}`]);
  }

  // Método para eliminar un vehículo
  eliminarVehiculo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      this.vehiculoService.deleteVehiculo(id).subscribe(
        () => {
          alert('Vehículo eliminado con éxito');
          this.obtenerVehiculos();  // Actualizar la lista de vehículos
        },
        (error) => {
          console.error('Error al eliminar el vehículo', error);
        }
      );
    }
  }
}
