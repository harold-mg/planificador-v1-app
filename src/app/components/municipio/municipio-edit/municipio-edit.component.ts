import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from 'src/app/services/municipio.service';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-municipio-edit',
  templateUrl: './municipio-edit.component.html',
  styleUrls: ['./municipio-edit.component.scss']
})
export class MunicipioEditComponent implements OnInit {
  municipioForm: FormGroup;
  municipioId: number = 0;
  coordinaciones: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private municipioService: MunicipioService,
    private coordinacionService: CoordinacionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.municipioForm = this.fb.group({
      nombre: ['', Validators.required],
      coordinacion_id: ['', Validators.required]  // Asegúrate de que este campo esté presente
    });
  }

  ngOnInit(): void {
    this.municipioId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerMunicipio();
    this.obtenerCoordinaciones();  // Cargar las coordinaciones para el select
  }

  obtenerMunicipio() {
    this.municipioService.getMunicipioById(this.municipioId).subscribe(
      (data) => {
        this.municipioForm.patchValue(data);  // Cargar los datos en el formulario
      },
      (error) => {
        console.error('Error al obtener el municipio', error);
      }
    );
  }

  obtenerCoordinaciones() {
    this.coordinacionService.getCoordinaciones().subscribe(
      (data) => {
        this.coordinaciones = data;
      },
      (error) => {
        console.error('Error al obtener las coordinaciones', error);
      }
    );
  }

  actualizarMunicipio() {
    if (this.municipioForm.valid) {
      this.municipioService.updateMunicipio(this.municipioId, this.municipioForm.value).subscribe(
        () => {
          alert('Municipio actualizado con éxito');
          this.router.navigate(['/ver-municipio']);
        },
        (error) => {
          console.error('Error al actualizar el municipio', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/ver-municipio']);
  }
}
