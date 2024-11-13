import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadSinVehiculoService } from 'src/app/services/actividad-sin-vehiculo.service'; // Servicio para manejar actividades
import { Router } from '@angular/router';
import { PoaService } from 'src/app/services/poa.service';
import { CentroSaludService } from 'src/app/services/centro-salud.service';
import { AuthService } from 'src/app/services/auth.service';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actividad-sin-vehiculo-form',
  templateUrl: './actividad-sin-vehiculo-form.component.html',
  styleUrls: ['./actividad-sin-vehiculo-form.component.scss']
})
export class ActividadSinVehiculoFormComponent implements OnInit {
  actividadForm: FormGroup;
  poas: any[] = [];
  selectedCoordinacionId: number | null = null;
  selectedMunicipioId: number | null = null;
  coordinaciones: any[] = [];
  municipios: any[] = [];
  centrosSalud: any[] = [];
  loading = false;
  isPlanificador: boolean = false;
  codigoPoa: string = 'USPS9-2'; // Ejemplo de código POA predefinido
  operaciones: any[] = []; // Para almacenar las operaciones en un array
  selectedOperacion: string = ''; // Para almacenar la operación seleccionada
  selectedOperacionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private actividadSinVehiculoService: ActividadSinVehiculoService, // Servicio de actividades sin vehículo
    private poaService: PoaService,
    private centroSaludService: CentroSaludService,
    private router: Router,
    private coordinacionService: CoordinacionService,
    private municipioService: MunicipioService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.actividadForm = this.fb.group({
      poa_id: ['', Validators.required],
      detalle_operacion: ['', Validators.required],
      operacion: [''],
      resultados_esperados: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      coordinacion: [''],
      municipio: [''],
      centro_salud_id: ['', Validators.required],
      tecnico_a_cargo: ['', Validators.required],
      detalles_adicionales: ['', Validators.required],
      usuario_id: [''], // Este campo se llenará automáticamente con el ID del usuario
    });
  }

  ngOnInit(): void {
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

  // Manejar selección de POA
  onPoaSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const poaId = target.value;

    if (poaId) {
        console.log('POA ID seleccionado:', poaId);

        // Llamar al servicio para obtener operaciones
        this.poaService.getOperacionesByPoaId(+poaId).subscribe((operaciones) => {
            this.operaciones = operaciones;  // Actualiza la lista de operaciones
            console.log('Operaciones recibidas:', this.operaciones);
        }, (error) => {
            console.error('Error al obtener operaciones:', error);
            this.operaciones = [];  // Limpiar operaciones en caso de error
        });
    } else {
        this.operaciones = [];  // Limpiar operaciones si no hay POA seleccionado
    }
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

  onCoordinacionSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCoordinacionId = +target.value;
    this.municipios = []; // Limpia la selección previa de municipios
    this.actividadForm.get('municipio')?.setValue(''); // Limpia el municipio seleccionado
    this.actividadForm.get('centro_salud_id')?.setValue(''); // Limpia el centro de salud seleccionado
    this.centroSaludService.getMunicipiosByCoordinacion(this.selectedCoordinacionId).subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  onMunicipioSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const municipioId = +target.value;
    this.centroSaludService.getCentrosSaludByMunicipio(municipioId).subscribe((centrosSalud) => {
      this.centrosSalud = centrosSalud; // Actualiza los centros de salud
      this.actividadForm.get('centro_salud_id')?.setValue(''); // Limpia el valor seleccionado de centro de salud
      console.log(this.centrosSalud);
    });
  }

  checkUserRole(): void {
    this.authService.getUserRole().subscribe((role) => {
      this.isPlanificador = role === 'planificador';
      if (!this.isPlanificador) {
        // Deshabilitar la opción de asignación de vehículos, si es necesario
        //this.actividadForm.get('vehiculo_id')?.disable(); // Eliminar esta parte porque ya no necesitamos vehículo
      }
    });
  }

  onSubmit(): void {
    if (this.actividadForm.valid) {
      this.loading = true;
      this.actividadSinVehiculoService.createActividadSinVehiculo(this.actividadForm.value).subscribe({
        next: () => {
          console.log('Actividad registrada exitosamente');
          alert('Actividad registrada exitosamente');
          window.location.reload(); // Recargar la página después del registro
        },
        error: (err) => {
          console.error('Error al registrar la actividad:', err);
          this.loading = false; // Detener el loading si hay un error
        }
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
