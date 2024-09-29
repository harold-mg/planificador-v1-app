import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipio-form',
  templateUrl: './municipio-form.component.html',
  styleUrls: ['./municipio-form.component.scss']
})
export class MunicipioFormComponent implements OnInit {
  municipioForm: FormGroup;
  coordinaciones: any[] = []; // Almacenar coordinaciones obtenidas del backend
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.municipioForm = this.fb.group({
      nombre: ['', Validators.required], // Campo de nombre del municipio
      coordinacion_id: [null, Validators.required], // Selección de la coordinación
    });
  }

  ngOnInit(): void {
    this.loadCoordinaciones(); // Cargar coordinaciones al iniciar
  }

  // Cargar coordinaciones desde el backend
  loadCoordinaciones() {
    this.http.get('http://localhost:8000/api/coordinaciones').subscribe(
      (data: any) => this.coordinaciones = data,
      (error) => this.handleError(error, 'Error al cargar las coordinaciones')
    );
  }

  onSubmit() {
    this.cleanErrors();

    if (this.municipioForm.invalid) {
      return;
    }

    this.http.post('http://localhost:8000/api/municipios', this.municipioForm.value).subscribe(
      response => {
        console.log('Municipio registrado exitosamente');
        this.router.navigate(['/registrar-municipio']); // Redirigir después del registro
      },
      errors => this.handleErrors(errors)
    );
  }

  handleError(error: any, message: string) {
    console.error(message, error);
    this.errors.general = message;
  }

  cleanErrors() {
    this.errors = {};
  }

  handleErrors(errors: any) {
    this.errors = errors.error.errors || { general: 'Error al registrar el municipio' };
  }

  getErrorMessage(field: string): string {
    if (this.municipioForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    return this.errors[field] ? this.errors[field][0] : ''; // Mostrar errores del servidor si existen
  }
}
