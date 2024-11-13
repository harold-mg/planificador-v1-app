import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehiculo-edit',
  templateUrl: './vehiculo-edit.component.html',
  styleUrls: ['./vehiculo-edit.component.scss']
})
export class VehiculoEditComponent implements OnInit {
  vehiculoForm: FormGroup;
  vehiculoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      disponible: [true]
    });
  }

  ngOnInit(): void {
    this.vehiculoId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerVehiculo();
  }

  obtenerVehiculo() {
    this.vehiculoService.getVehiculoById(this.vehiculoId).subscribe(
      (data) => {
        this.vehiculoForm.patchValue(data);  // Cargar los datos del vehículo en el formulario
      },
      (error) => {
        console.error('Error al obtener el vehículo', error);
      }
    );
  }

  actualizarVehiculo() {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.updateVehiculo(this.vehiculoId, this.vehiculoForm.value).subscribe(
        () => {
          alert('Vehículo actualizado con éxito');
          this.router.navigate(['/ver-vehiculo']);  // Redirigir a la lista de vehículos
        },
        (error) => {
          console.error('Error al actualizar el vehículo', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/ver-vehiculo']);
  }
}
