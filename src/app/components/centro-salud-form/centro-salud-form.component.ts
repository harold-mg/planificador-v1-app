import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro-salud-form',
  templateUrl: './centro-salud-form.component.html',
  styleUrls: ['./centro-salud-form.component.scss']
})
export class CentroSaludFormComponent implements OnInit {
  centroSaludForm: FormGroup;
  coordinaciones: any[] = [];
  municipios: any[] = [];
  centroSalud: any = {
    nombre: '',
    tipo: '',
    municipio_id: null
  };
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.centroSaludForm = this.fb.group({
      nombre: ['', Validators.required], // Campo de nombre del centro de salud
      tipo: ['', Validators.required],  // Añadir el campo 'tipo'
      municipio_id: [null, Validators.required], // Selección del municipio
    });
  }

  ngOnInit(): void {
    this.loadCoordinaciones(); // Cargar coordinaciones al iniciar
  }

  // Cargar coordinaciones desde el backend
  loadCoordinaciones() {
    this.http.get('http://localhost:8000/api/coordinaciones').subscribe(
      (data: any) => {
        this.coordinaciones = data;
      },
      (error) => {
        console.error('Error al cargar las coordinaciones', error);
      }
    );
  }

  // Cuando se selecciona una coordinación, cargar los municipios correspondientes
  onCoordinacionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const coordinacionId = selectElement.value;

    if (coordinacionId) {
      this.http.get(`http://localhost:8000/api/municipios/coordinacion/${coordinacionId}`).subscribe(
        (data: any) => {
          this.municipios = data;
        },
        (error) => {
          console.error('Error al cargar los municipios', error);
        }
      );
    } else {
      this.municipios = [];
    }
  }

  registerCentroSalud() {
    // Aquí puedes implementar el registro del centro de salud
    this.http.post('http://localhost:8000/api/centros_salud', this.centroSalud).subscribe(
      (response) => {
        console.log('Centro de salud registrado:', response);
      },
      (error) => {
        console.error('Error al registrar el centro de salud', error);
      }
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
    this.errors = errors.error.errors || { general: 'Error al registrar el centro de salud' };
  }

  getErrorMessage(field: string): string {
    if (this.centroSaludForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    return this.errors[field] ? this.errors[field][0] : ''; // Mostrar errores del servidor si existen
  }
}
