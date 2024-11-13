import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoordinacionService } from 'src/app/services/coordinacion.service';

@Component({
  selector: 'app-coordinacion-form',
  templateUrl: './coordinacion-form.component.html',
  styleUrls: ['./coordinacion-form.component.scss']
})
export class CoordinacionFormComponent implements OnInit {
  coordinacionForm: FormGroup;
  errors: any = {}; // Para almacenar errores

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private coordinacionService: CoordinacionService
  ) {
    this.coordinacionForm = this.fb.group({
      nombre: ['', Validators.required], // Campo para el nombre
    });
  }

  ngOnInit(): void {
    // Aquí puedes cargar datos si es necesario
  }

  onSubmit() {
    this.cleanErrors();
    if (this.coordinacionForm.invalid) {
      return; // Si el formulario no es válido, no hacer el submit
    }

    this.coordinacionService.createCoordinacion(this.coordinacionForm.value).subscribe(
      response => {
        console.log('Coordinación registrada exitosamente:', response);
        this.router.navigate(['/registrar-coordinacion']); // Cambia la ruta a donde quieras redirigir
      },
      error => {
        console.error('Error al registrar la coordinación:', error);
        this.handleErrors(error); // Manejar los errores aquí
      }
    );
  }


  cleanErrors() {
    this.errors = {};
  }

  handleErrors(errors: any) {
    this.errors = errors.error.errors || { general: 'Error al registrar la coordinación' };
  }

  getErrorMessage(field: string): string {
    if (this.coordinacionForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    return this.errors[field] ? this.errors[field][0] : ''; // Mostrar errores del servidor si existen
  }
}

