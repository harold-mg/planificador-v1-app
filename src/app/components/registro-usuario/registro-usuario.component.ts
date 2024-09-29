import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = {};  // Para almacenar los errores
  areas: any[] = []; // Almacena las áreas obtenidas del backend
  unidades: any[] = []; // Almacena las unidades obtenidas del backend
  isAreaRole: boolean = false;
  isUnidadRole: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient, // Para hacer solicitudes HTTP
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required], // Campo para nombre
      apellido: ['', Validators.required], // Campo para apellido
      cedula_identidad: ['', Validators.required], // Campo para cédula
      nombre_usuario: ['', Validators.required], // Campo para nombre de usuario
      password: ['', [Validators.required, Validators.minLength(6)]], // Campo para contraseña
      password_confirmation: ['', Validators.required], // Campo para confirmar contraseña
      rol: ['', Validators.required], // Campo para rol
      area_id: [null], // Campo para seleccionar el área
      unidad_id: [null] // Campo para seleccionar la unidad
    }, { validator: this.passwordMatchValidator }); // Validador personalizado para coincidir passwords
  }

  ngOnInit(): void {
    this.loadAreas();
    this.loadUnidades();
    // Inicializamos el FormGroup en ngOnInit
    this.registerForm.get('someControl')?.disable(); // Cambia 'someControl' al nombre correcto del control que quieras deshabilitar
  }

  // Validador personalizado para confirmar si las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('password_confirmation')?.value
      ? null : { mismatch: true };
  }

  // Método para enviar el formulario
  onSubmit(): void {
    this.cleanErrors();
    if (this.registerForm.invalid) {
      return; // Si el formulario no es válido, no hacer el submit
    }

    this.authService.register(this.registerForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  // Cargar las áreas desde el backend
  loadAreas() {
    this.http.get('http://localhost:8000/api/areas').subscribe(
      (data: any) => {
        this.areas = data;
      },
      (error) => {
        console.error('Error al cargar las áreas', error);
        this.errors.general = 'Error al cargar las áreas';
      }
    );
  }

  loadUnidades() {
    this.http.get('http://localhost:8000/api/unidades').subscribe(
      (data: any) => {
        this.unidades = data;
      },
      (error) => {
        console.error('Error al cargar las unidades', error);
        this.errors.general = 'Error al cargar las unidades';
      }
    );
  }

  onRoleChange(event: Event) {
    const selectedRole = (event.target as HTMLSelectElement).value;
  
    this.isAreaRole = selectedRole === 'responsable_area';
    this.isUnidadRole = selectedRole === 'responsable_unidad';
  
    // Si se selecciona "Responsable de Área", limpiar el campo de área y forzar la selección de unidad
    if (this.isAreaRole) {
      this.registerForm.get('unidad_id')?.setValue(null); // Limpiar la selección de unidad
      this.registerForm.get('area_id')?.setValue(null);   // Limpiar la selección de área
    }
    /* setTimeout(() => {
      if (this.isAreaRole) {
        this.registerForm.get('unidad_id')?.setValue(null); // Limpiar la selección de unidad
        this.registerForm.get('area_id')?.setValue(null);   // Limpiar la selección de área
      }
    }, 0); */
    this.cdr.detectChanges();
  }
    
    // Método para cargar áreas según la unidad seleccionada
    onUnidadChange(event: Event) {
      const unidadId = (event.target as HTMLSelectElement).value;
    
      if (unidadId) {
        this.loadAreasByUnidad(unidadId); // Cargar áreas específicas de la unidad seleccionada
      }
    }
    
    // Método para cargar áreas según una unidad seleccionada desde el backend
    loadAreasByUnidad(unidadId: string) {
      this.http.get(`http://localhost:8000/api/unidades/${unidadId}/areas`).subscribe(
        (data: any) => {
          this.areas = data; // Actualizar las áreas con las áreas de la unidad seleccionada
        },
        (error) => {
          console.error('Error al cargar las áreas para la unidad seleccionada', error);
          this.errors.general = 'Error al cargar las áreas para la unidad seleccionada';
        }
      );
    }
    

  // Limpiar errores anteriores
  private cleanErrors(): void {
    this.errors = {};
  }

  // Manejar respuesta exitosa
  private handleResponse(response: any): void {
    console.log(response.message);
    this.router.navigateByUrl('/dashboard'); // Redirigir al dashboard o donde prefieras
  }

  // Manejar errores del servidor
  private handleErrors(errors: any): void {
    this.errors = errors.error.errors || { general: 'Error al registrar el usuario' };

    // Traducir mensajes en el frontend si es necesario
    if (this.errors?.nombre_usuario) {
      this.errors.nombre_usuario[0] = this.translateError(this.errors.nombre_usuario[0]);
    }
  }

  private translateError(errorMessage: string): string {
    if (errorMessage === 'The nombre usuario has already been taken.') {
      return 'El nombre de usuario ya existe.'; // Traducción del mensaje
    }
    return errorMessage; // Devuelve el mensaje original si no necesita traducción
  }

  // Mostrar el mensaje de error si existe para un campo específico
  getErrorMessage(field: string): string {
    if (this.registerForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    if (field === 'password' && this.registerForm.get(field)?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (field === 'password_confirmation' && this.registerForm.errors?.['mismatch']) {
      return 'Las contraseñas no coinciden';
    }
    return this.errors[field] ? this.errors[field][0] : ''; // Mostrar errores del servidor si existen
  }
}
