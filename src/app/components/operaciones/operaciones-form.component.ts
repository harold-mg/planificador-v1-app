import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OperacionService } from 'src/app/services/operacion.service';
import { PoaService } from 'src/app/services/poa.service';


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
    private router: Router,
    private operacionService: OperacionService,
    private poasService: PoaService
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
    this.poasService.getPoas().subscribe(
      (data: any) => this.poas = data,
      (error) => this.handleError(error, 'Error al cargar los POAs')
    );
  }

  onSubmit() {
    this.cleanErrors();
    if (this.operacionesForm.invalid) {
      return; // Si el formulario no es válido, no hacer el submit
    }

    this.operacionService.registerOperacion(this.operacionesForm.value).subscribe(
      response => {
        console.log('Operación registrada exitosamente:', response);
        this.operacionesForm.reset();
        alert('Operación registrada exitosamente');
        // this.router.navigate(['/registrar-operaciones']); // Redirigir después de guardar
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
