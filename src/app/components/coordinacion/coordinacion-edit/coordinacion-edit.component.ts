import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coordinacion-edit',
  templateUrl: './coordinacion-edit.component.html',
  styleUrls: ['./coordinacion-edit.component.scss']
})
export class CoordinacionEditComponent implements OnInit {
  coordinacionForm: FormGroup;
  coordinacionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private coordinacionService: CoordinacionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.coordinacionForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.coordinacionId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerCoordinacion();
  }

  obtenerCoordinacion() {
    this.coordinacionService.getCoordinacionById(this.coordinacionId).subscribe(
      (data) => {
        this.coordinacionForm.patchValue(data);  // Cargar los datos de la coordinación en el formulario
      },
      (error) => {
        console.error('Error al obtener la coordinación', error);
      }
    );
  }

  actualizarCoordinacion() {
    if (this.coordinacionForm.valid) {
      this.coordinacionService.updateCoordinacion(this.coordinacionId, this.coordinacionForm.value).subscribe(
        () => {
          alert('Coordinación actualizada con éxito');
          this.router.navigate(['/ver-coordinacion']);  // Redirigir a la lista de coordinaciones
        },
        (error) => {
          console.error('Error al actualizar la coordinación', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/ver-coordinacion']);
  }
}
