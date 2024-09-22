import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  registerForm: FormGroup;
  errors: any = {};  // Para almacenar los errores

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required], // Campo para nombre
      apellido: ['', Validators.required], // Campo para apellido
      cedula_identidad: ['', Validators.required], // Campo para cédula
      nombre_usuario: ['', Validators.required], // Campo para nombre de usuario
      password: ['', [Validators.required, Validators.minLength(6)]], // Campo para contraseña
      password_confirmation: ['', Validators.required], // Campo para confirmar contraseña
      rol: ['', Validators.required] // Campo para rol
    }, { validator: this.passwordMatchValidator }); // Validador personalizado para coincidir passwords
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
    this.errors = errors.error.errors; // Los errores vienen del backend, ej. duplicación de email o contraseñas no coinciden
  }

  // Mostrar el mensaje de error si existe para un campo específico
  getErrorMessage(field: string): string {
    if (this.registerForm.get(field)?.hasError('required')) {
      return `${field} es requerido`;
    }
    if (field === 'email' && this.registerForm.get(field)?.hasError('email')) {
      return 'Formato de email no válido';
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
/* export class RegistroUsuarioComponent {
  usuario = {
    nombre: '',
    apellido: '',
    cedula_identidad: '',
    nombre_usuario: '',
    password: '',
    rol: ''
  };
  confirmPassword: string = '';  // Campo para confirmar la contraseña
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.usuario.password === this.confirmPassword) {
      // Enviar password y password_confirmation al servidor
      const usuarioData = {
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        cedula_identidad: this.usuario.cedula_identidad,
        nombre_usuario: this.usuario.nombre_usuario,
        password: this.usuario.password,
        password_confirmation: this.confirmPassword,  // Incluir la confirmación de la contraseña
        rol: this.usuario.rol
      };
  
      this.http.post('http://localhost:8000/api/register', usuarioData)
        .subscribe(
          (response) => {
            console.log('Usuario registrado con éxito', response);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error al registrar el usuario', error);
          }
        );
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }
} */


/* onSubmit() {
  this.http.post('http://localhost:8000/api/register', this.usuario)
    .subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/dashboard']); // Redirige al dashboard después de registrar
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
      }
    );
} */