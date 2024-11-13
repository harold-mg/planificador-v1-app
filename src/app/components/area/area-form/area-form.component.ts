import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
  areaForm: FormGroup;
/*   nombre: string = '';
  unidad_id: number | null = null; */
  unidades: any[] = []; // Cambia el tipo según tu modelo

  constructor(
    private http: HttpClient, 
    private router: Router,
    private areaService: AreaService, // Inyecta el servicio de áreas
    private unidadService: UnidadService, // Inyecta el servicio de unidades 
    private fb: FormBuilder) {
      this.areaForm = this.fb.group({
        nombre: ['', Validators.required],
        unidad_id: [null, Validators.required]
      });
    }

  ngOnInit(): void {
    this.obtenerUnidades(); // Carga las unidades al iniciar el componente
  }

  obtenerUnidades(): void {
    this.unidadService.getUnidades().subscribe(
      (response: any) => {
        this.unidades = response; // Asigna la respuesta a unidades
      },
      (error) => {
        console.error('Error al obtener unidades', error);
      }
    );
  }
  registrarArea(): void {
    const nuevaArea = this.areaForm.value; // Obtén los valores del formulario

    this.areaService.createArea(nuevaArea).subscribe(
      (response) => {
        console.log('Área registrada con éxito', response);
        alert('Área registrada exitosamente');

        // Limpiar el formulario
        this.areaForm.reset(); // Limpiar el formulario
      },
      (error) => {
        console.error('Error al registrar el área', error);
      }
    );
  }
}

