import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poa-form',
  templateUrl: './poa-form.component.html',
  styleUrls: ['./poa-form.component.scss']
})
export class PoaFormComponent implements OnInit {
  poaForm: FormGroup;
  areas: any[] = []; // Para almacenar áreas del backend
  unidades: any[] = []; // Para almacenar unidades del backend
  errors: any = {}; // Para almacenar errores

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.poaForm = this.fb.group({
      codigo_poa: ['', Validators.required], // Campo para código POA
      //operacion: ['', Validators.required], // Campo para operación
      area_id: [null], // Campo para seleccionar área
      unidad_id: [null, Validators.required], // Campo para seleccionar unidad
    });
  }

  ngOnInit(): void {
    this.loadUnidades();
    this.poaForm.get('unidad_id')?.valueChanges.subscribe(unidad_id => {
      this.onUnidadChange(unidad_id);
    });
  }

  loadAreas() {
    this.http.get('http://localhost:8000/api/areas').subscribe(
      (data: any) => this.areas = data,
      (error) => this.handleError(error, 'Error al cargar las áreas')
    );
  }

  loadUnidades() {
    this.http.get('http://localhost:8000/api/unidades').subscribe(
      (data: any) => this.unidades = data,
      (error) => this.handleError(error, 'Error al cargar las unidades')
    );
  }

  onSubmit() {
    this.cleanErrors();
    if (this.poaForm.invalid) {
      return; // Si el formulario no es válido, no hacer el submit
    }

    this.http.post('http://localhost:8000/api/poas', this.poaForm.value).subscribe(
      response => {
        console.log('Registro de POA exitoso:', response); // Mensaje en consola
        this.router.navigate(['/registrar-poa']); // Redirigir después de guardar
      },
      errors => this.handleErrors(errors)
    );
  }
  onUnidadChange(unidad_id: number) {
    if (unidad_id) {
      this.http.get(`http://localhost:8000/api/unidades/${unidad_id}/areas`).subscribe(
        (data: any) => {
          this.areas = data;
          this.areas.unshift({ id: null, nombre: 'Ninguna' }); // Añadir la opción 'Ninguna'
          this.poaForm.patchValue({ area_id: null }); // Reiniciar el campo área
        },
        error => this.handleError(error, 'Error al cargar las áreas de la unidad')
      );
    } else {
      this.areas = [{ id: null, nombre: 'Ninguna' }]; // Si no hay unidad seleccionada
      this.poaForm.patchValue({ area_id: null });
    }
  }
  
  handleError(error: any, message: string) {
    console.error(message, error);
    this.errors.general = message;
  }

  cleanErrors() {
    this.errors = {};
  }

  handleErrors(errors: any) {
    this.errors = errors.error.errors || { general: 'Error al registrar el POA' };
  }

  getErrorMessage(field: string): string {
    if (this.poaForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    return this.errors[field] ? this.errors[field][0] : ''; // Mostrar errores del servidor si existen
  }
}