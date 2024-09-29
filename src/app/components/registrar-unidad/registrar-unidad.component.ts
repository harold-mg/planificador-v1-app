import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadService } from '../../services/unidad.service'; // Servicio para interactuar con la API

@Component({
  selector: 'app-registrar-unidad',
  templateUrl: './registrar-unidad.component.html',
})
export class RegistrarUnidadComponent {
  unidadForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private unidadService: UnidadService) {
    this.unidadForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.unidadForm.valid) {
      this.unidadService.registrarUnidad(this.unidadForm.value).subscribe({
        next: (response) => {
          console.log('Unidad registrada correctamente', response);
          this.unidadForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error al registrar la unidad';
        },
      });
    }
  }
}
