import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operaciones-form',
  templateUrl: './operaciones-form.component.html',
  styleUrls: ['./operaciones-form.component.scss']
})
export class OperacionesFormComponent implements OnInit {
  operacionesForm: FormGroup;
  poas: any[] = []; // Para almacenar los POAs desde el backend
  errors: any = {}; // Para almacenar errores

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.operacionesForm = this.fb.group({
      poa_id: [null, Validators.required], // Seleccionar POA_ID
      //nombre_operacion: ['', Validators.required], // Nombre de la operación
      descripcion: ['', Validators.required], // Descripción de la operación
    });
  }

  ngOnInit(): void {
    this.loadPoas(); // Cargar POAs al inicializar el componente
  }

  loadPoas() {
    this.http.get('http://localhost:8000/api/poas').subscribe(
      (data: any) => this.poas = data,
      (error) => this.handleError(error, 'Error al cargar los POAs')
    );
  }

  onSubmit() {
    this.cleanErrors();
    if (this.operacionesForm.invalid) {
      return; // Si el formulario no es válido, no hacer el submit
    }

    this.http.post('http://localhost:8000/api/operaciones', this.operacionesForm.value).subscribe(
      response => {
        console.log('Operación registrada exitosamente:', response);
        this.router.navigate(['/registrar-operaciones']); // Redirigir después de guardar
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
    this.errors = errors.error.errors || { general: 'Error al registrar la operación' };
  }

  getErrorMessage(field: string): string {
    if (this.operacionesForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    return this.errors[field] ? this.errors[field][0] : ''; // Mostrar errores del servidor si existen
  }
}
