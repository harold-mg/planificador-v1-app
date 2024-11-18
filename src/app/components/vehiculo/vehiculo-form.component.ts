import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.scss']
})
export class VehiculoFormComponent implements OnInit {
  vehiculoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private vehiculoService: VehiculoService
  ) {
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      disponible: [true]
    });
  }

  ngOnInit(): void {}

/*   registerVehiculo() {
    if (this.vehiculoForm.valid) {
      this.http.post('http://localhost:8000/api/vehiculos', this.vehiculoForm.value).subscribe(
        response => {
          console.log('Vehículo registrado:', response);

        },
        error => {
          console.error('Error al registrar el vehículo:', error);
        }
      );
    }
  } */
  registerVehiculo() {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.createVehiculo(this.vehiculoForm.value).subscribe(
        response => {
          console.log('Vehículo registrado:', response);
          alert('Vehiculo registrado correctamente');
          this.vehiculoForm.reset();
        },
        error => {
          console.error('Error al registrar el vehículo:', error);
        }
      );
    }
  }
}
