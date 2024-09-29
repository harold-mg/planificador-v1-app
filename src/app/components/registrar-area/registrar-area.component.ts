import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-area',
  templateUrl: './registrar-area.component.html',
  styleUrls: ['./registrar-area.component.scss']
})
export class RegistrarAreaComponent implements OnInit {
  nombre: string = '';
  unidad_id: number | null = null;
  unidades: any[] = []; // Cambia el tipo según tu modelo

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUnidades(); // Carga las unidades al iniciar el componente
  }

  obtenerUnidades(): void {
    this.http.get('http://localhost:8000/api/unidades').subscribe(
      (response: any) => {
        this.unidades = response; // Asigna la respuesta a unidades
      },
      (error) => {
        console.error('Error al obtener unidades', error);
      }
    );
  }

  registrarArea(): void {
    const nuevaArea = {
      nombre: this.nombre,
      unidad_id: this.unidad_id
    };

    this.http.post('http://localhost:8000/api/areas', nuevaArea).subscribe(
      (response) => {
        console.log('Área registrada con éxito', response);
        this.router.navigate(['/dashboard']); // Redirige a la lista de áreas o donde desees
      },
      (error) => {
        console.error('Error al registrar el área', error);
      }
    );
  }
}

