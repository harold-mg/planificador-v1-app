import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: any = {}; // Datos del usuario que se editarán
  loading: boolean = true; // Indicador de carga
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Crear el formulario de usuario con campos para editar
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula_identidad: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      password_confirmation: [''],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Obtener el ID del usuario de la URL
    if (id) {
      this.loadUsuario(id);
    }
  }

  // Cargar datos del usuario
  loadUsuario(id: string): void {
    this.authService.getUsuario(id).subscribe(
      (data) => {
        this.usuario = data;
        this.usuarioForm.patchValue(this.usuario);  // Rellenar el formulario con los datos del usuario
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar el usuario', error);
        this.loading = false;
      }
    );
  }

  // Validar si las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('password_confirmation')?.value
      ? null : { mismatch: true };
  }

  // Método para actualizar el usuario
  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      return;  // Si el formulario es inválido, no hacer submit
    }

    this.authService.updateUsuario(this.usuario.id, this.usuarioForm.value).subscribe(
      (response) => {
        alert('Usuario actualizado con éxito');
        this.router.navigate(['/ver-usuario']);  // Redirigir a la lista de usuarios
      },
      (error) => {
        this.errors = error.error.errors || { general: 'Error al actualizar el usuario' };
      }
    );
  }
}
