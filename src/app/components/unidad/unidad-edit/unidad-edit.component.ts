import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unidad-edit',
  templateUrl: './unidad-edit.component.html',
  styleUrls: ['./unidad-edit.component.scss']
})
export class UnidadEditComponent implements OnInit {
  unidadForm: FormGroup;
  unidadId: number = 0;


  constructor(
    private route: ActivatedRoute,
    private unidadService: UnidadService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.unidadForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.unidadId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerUnidad();
  }

  obtenerUnidad() {
    this.unidadService.getUnidadById(this.unidadId).subscribe(
      (data) => {
        this.unidadForm.patchValue(data);  // Cargar los datos de la unidad en el formulario
      },
      (error) => {
        console.error('Error al obtener la unidad', error);
      }
    );
  }

  actualizarUnidad() {
    if (this.unidadForm.valid) {
      this.unidadService.updateUnidad(this.unidadId, this.unidadForm.value).subscribe(
        () => {
          alert('Unidad actualizada con éxito');
          this.router.navigate(['/ver-unidad']);  // Redirigir a la lista de unidades
        },
        (error) => {
          console.error('Error al actualizar la unidad', error);
        }
      );
    }
  }
  cancelar() {
    this.router.navigate(['/ver-unidad']);
  }
}
