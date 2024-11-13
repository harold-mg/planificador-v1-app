import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentroSaludService } from 'src/app/services/centro-salud.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-centro-salud-edit',
  templateUrl: './centro-salud-edit.component.html',
  styleUrls: ['./centro-salud-edit.component.scss']
})
export class CentroSaludEditComponent implements OnInit {
  centroSaludForm: FormGroup;
  centroSaludId: number = 0;
  municipios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private centroSaludService: CentroSaludService,
    private municipioService: MunicipioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.centroSaludForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      municipio_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.centroSaludId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerCentroSalud();
    this.obtenerMunicipios();  // Cargar los municipios
  }

  obtenerCentroSalud() {
    this.centroSaludService.getCentroSaludById(this.centroSaludId).subscribe(
      (data) => {
        this.centroSaludForm.patchValue(data);  // Llenar el formulario con los datos del centro de salud
      },
      (error) => {
        console.error('Error al obtener el centro de salud', error);
      }
    );
  }

  obtenerMunicipios() {
    this.municipioService.getMunicipios().subscribe(
      (data) => {
        this.municipios = data;
      },
      (error) => {
        console.error('Error al obtener los municipios', error);
      }
    );
  }

  actualizarCentroSalud() {
    if (this.centroSaludForm.valid) {
      //console.log(this.centroSaludForm.value);  // Verifica que los valores son correctos
      this.centroSaludService.updateCentroSalud(this.centroSaludId, this.centroSaludForm.value).subscribe(
        () => {
          alert('Centro de salud actualizado con éxito');
          this.router.navigate(['/ver-centro-salud']);
        },
        (error) => {
          console.error('Error al actualizar el centro de salud', error);
        }
      );
    }
  }
  

  cancelar() {
    this.router.navigate(['/ver-centro-salud']);
  }
}
