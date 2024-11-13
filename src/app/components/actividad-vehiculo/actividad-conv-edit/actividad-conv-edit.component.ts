import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service';
import { PoaService } from 'src/app/services/poa.service';
import { CentroSaludService } from 'src/app/services/centro-salud.service';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actividad-conv-edit',
  templateUrl: './actividad-conv-edit.component.html',
  styleUrls: ['./actividad-conv-edit.component.scss']
})
export class ActividadConvEditComponent implements OnInit {
  actividadForm: FormGroup;
  poas: any[] = [];
  operaciones: any[] = [];
  coordinaciones: any[] = [];
  municipios: any[] = [];
  centrosSalud: any[] = [];
  loading = false;
  isPlanificador: boolean = false;
  actividadId!: number; // ID de la actividad a modificar

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadVehiculoService,
    private poaService: PoaService,
    private centroSaludService: CentroSaludService,
    private coordinacionService: CoordinacionService,
    private municipioService: MunicipioService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // Para obtener el ID de la actividad desde la URL
  ) {
    this.actividadForm = this.fb.group({
      poa_id: ['', Validators.required],
      detalle_operacion: ['', Validators.required],
      resultados_esperados: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      coordinacion: [''],
      municipio: [''],
      centro_salud_id: ['', Validators.required],
      tecnico_a_cargo: ['', Validators.required],
      detalles_adicionales: ['', Validators.required],
      usuario_id: [''], // Este campo se llenará automáticamente con el ID del usuario
      //estado_aprobacion: ['pendiente'],
    });
  }

  ngOnInit(): void {
    this.actividadId = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID de la actividad de la URL
    if (this.actividadId) {
      this.loadActividadData(this.actividadId); // Cargar los datos de la actividad existente
    }
    this.loadPoas();
    this.loadCoordinaciones();
    this.loadMunicipios();
    this.loadCentrosSalud();
    this.setUsuarioId();
  }

  setUsuarioId(): void {
    this.authService.getUser().subscribe(user => {
      if (user && user.id) {
        this.actividadForm.get('usuario_id')?.setValue(user.id); // Asignar el ID del usuario autenticado
      }
    }, error => {
      console.error('Error al obtener el usuario autenticado:', error);
    });
  }

  loadPoas(): void {
    this.poaService.getPoas().subscribe((poas) => {
      this.poas = poas;
    });
  }
  onPoaSelected(event: any): void {
    const poaId = event.target.value;
    this.poaService.getOperacionesByPoaId(poaId).subscribe((operaciones) => {
      this.operaciones = operaciones;
    });
  }

  loadCoordinaciones(): void {
    this.coordinacionService.getCoordinaciones().subscribe(data => {
      this.coordinaciones = data;
    });
  }

  loadMunicipios(): void {
    this.municipioService.getMunicipios().subscribe(data => {
      this.municipios = data;
    });
  }

  loadCentrosSalud(): void {
    this.centroSaludService.getCentrosSalud().subscribe(data => {
      this.centrosSalud = data;
    });
  }

  loadActividadData(id: number): void {
    this.actividadService.getActividadVehiculoById(id).subscribe((data: any) => {
      // Setear los valores del formulario con los datos de la actividad
      this.actividadForm.patchValue({
        poa_id: data.poa_id,
        detalle_operacion: data.detalle_operacion,
        resultados_esperados: data.resultados_esperados,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        coordinacion: data.coordinacion,
        municipio: data.municipio,
        centro_salud_id: data.centro_salud_id,
        tecnico_a_cargo: data.tecnico_a_cargo,
        detalles_adicionales: data.detalles_adicionales,
        usuario_id: data.usuario_id
      });

      // Cargar las operaciones relacionadas con el POA seleccionado
      this.poaService.getOperacionesByPoaId(data.poa_id).subscribe((operaciones) => {
        this.operaciones = operaciones;
      });

      // Cargar municipios y centros de salud relacionados con la coordinación y el municipio seleccionados
      if (data.coordinacion) {
        this.onCoordinacionSelected({ target: { value: data.coordinacion } });
      }

      if (data.municipio) {
        this.onMunicipioSelected({ target: { value: data.municipio } });
      }
    });
  }

  onCoordinacionSelected(event: any): void {
    const coordinacionId = event.target.value;
    this.centroSaludService.getMunicipiosByCoordinacion(coordinacionId).subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  onMunicipioSelected(event: any): void {
    const municipioId = event.target.value;
    this.centroSaludService.getCentrosSaludByMunicipio(municipioId).subscribe((centrosSalud) => {
      this.centrosSalud = centrosSalud;
    });
  }

  onSubmit(): void {
    if (this.actividadForm.valid) {
      this.loading = true;
      console.log("Datos del formulario:", this.actividadForm.value); // Agrega un log para verificar los datos
      this.actividadService.updateActividadVehiculo(this.actividadId, this.actividadForm.value).subscribe({
        next: () => {
          console.log('Actividad modificada exitosamente');
          alert('Actividad modificada exitosamente');
          this.router.navigate(['/aprobar-convehi-planificador']);
        },
        error: (err) => {
          console.error('Error al modificar la actividad:', err);
          this.loading = false;
        }
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
