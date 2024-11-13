import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: any[] = []; // Aquí se almacenarán los usuarios
  usuario: any = {};
  loading: boolean = true; // Indicador de carga

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  // Método para cargar los usuarios

  loadUsuarios(): void {
    this.authService.getAllUsers().subscribe(
      (data: any[]) => {
        this.usuarios = data;  // Asignamos la respuesta a la variable 'usuarios'
        this.loading = false;  // Ya no estamos cargando
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
        this.loading = false;  // Detener la carga
      }
    );
  }
  

  // Método para ir a la página de edición
  editarUsuario(id: number): void {
    this.router.navigate([`/editar-usuario/${id}`]);
  }
}
