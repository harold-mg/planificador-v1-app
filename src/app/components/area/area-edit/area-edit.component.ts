import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss']
})
export class AreaEditComponent implements OnInit {
  areaForm: FormGroup;
  areaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.areaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.areaId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerArea();
  }

  obtenerArea() {
    this.areaService.getAreaById(this.areaId).subscribe(
      (data) => {
        this.areaForm.patchValue(data);  // Cargar los datos del área en el formulario
      },
      (error) => {
        console.error('Error al obtener el área', error);
      }
    );
  }

  actualizarArea() {
    if (this.areaForm.valid) {
      this.areaService.updateArea(this.areaId, this.areaForm.value).subscribe(
        () => {
          alert('Área actualizada con éxito');
          this.router.navigate(['/ver-area']);  // Redirigir a la lista de áreas
        },
        (error) => {
          console.error('Error al actualizar el área', error);
        }
      );
    }
  }
  cancelar() {
    this.router.navigate(['/ver-area']);
  }
}

