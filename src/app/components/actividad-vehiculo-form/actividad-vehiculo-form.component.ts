import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadVehiculoService } from 'src/app/services/actividad-vehiculo.service';
import { Router } from '@angular/router';
import { PoaService } from 'src/app/services/poa.service';
import { CentroSaludService } from 'src/app/services/centro-salud.service';
import { AuthService } from 'src/app/services/auth.service';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-actividad-vehiculo-form',
  templateUrl: './actividad-vehiculo-form.component.html',
  styleUrls: ['./actividad-vehiculo-form.component.scss']
})
export class ActividadVehiculoFormComponent implements OnInit {
  actividadForm: FormGroup;
  poas: any[] = [];
  //operaciones: any[] = [];
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
    private actividadService: ActividadVehiculoService,
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
      //estado_aprobacion: [''], // Este campo se llenará automáticamente con el valor 'pendiente'
      
    });
  }

  ngOnInit(): void {
    this.loadPoas();
    this.loadCoordinaciones();
    this.loadMunicipios();
    this.loadCentrosSalud();
    // Llamamos al método para obtener el ID del usuario autenticado
    this.setUsuarioId();
    // Establecemos el estado de aprobación por defecto como 'pendiente'
    //this.actividadForm.get('estado_aprobacion')?.setValue('pendiente');
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
    // Método para manejar la selección de la operación
    onOperacionSelect(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const operacionId = target.value;
  
      if (operacionId) {
        this.selectedOperacionId = +operacionId;
        this.actividadForm.get('detalle_operacion')?.setValue(this.selectedOperacionId);
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
        this.actividadForm.get('vehiculo_id')?.disable();
      }
    });
  }
  

  onSubmit(): void {
    if (this.actividadForm.valid) {
      this.loading = true;
      this.actividadService.createActividadVehiculo(this.actividadForm.value).subscribe({
        next: () => {
          console.log('actividad registrada exitosamente:');
          alert('Actividad con vehículo registrada exitosamente');
          this.actividadForm.reset();
          this.router.navigate(['/actividad-vehiculo']);
        },
        error: (err) => {
          console.error('Error al planificar la actividad:', err);
          this.loading = false; // Detener el loading si hay un error
        }
      });
    }
    else {
      console.log('El formulario no es válido');
    }
  }
}

  // Manejar selección de POA
/*   onPoaSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const poaId = target.value;  // Ahora obtienes el `poa_id` en lugar del `codigo_poa`
  
    if (poaId) {
      console.log('POA ID seleccionado:', poaId);
      this.poaService.getOperacionesByPoa(poaId).subscribe((operaciones) => {
        this.operaciones = operaciones;  // Actualizar operaciones
        console.log('Operaciones recibidas:', this.operaciones);
        this.actividadForm.get('operacion')?.setValue('');  // Limpiar la operación seleccionada
      }, (error) => {
        console.error('Error al obtener operaciones:', error);
      });
    } else {
      this.operaciones = [];  // Limpiar operaciones si no hay POA seleccionado
    }
  } */
// Manejar selección de POA
/* onPoaSelected(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const poaId = target.value;  // Ahora obtienes el `poa_id`

  if (poaId) {
    console.log('POA ID seleccionado:', poaId);

    // Llamas a la función `getPoaById` para obtener el POA completo
    this.poaService.getPoaById(+poaId).subscribe((poa) => { // Asegúrate de convertir el `poaId` a número
      console.log('POA recibido:', poa);

      // Aquí puedes acceder a las operaciones del POA si están incluidas en la respuesta
      if (poa && poa.operaciones) {
        this.operaciones = poa.operaciones;  // Actualizar las operaciones si existen
        console.log('Operaciones recibidas:', this.operaciones);
      } else {
        this.operaciones = [];  // Limpiar si no hay operaciones
      }

      // Limpiar la operación seleccionada
      this.actividadForm.get('operacion')?.setValue('');
    }, (error) => {
      console.error('Error al obtener el POA:', error);
      this.operaciones = [];  // Limpiar operaciones en caso de error
    });
  } else {
    this.operaciones = [];  // Limpiar operaciones si no hay POA seleccionado
  }
}

  // Método para manejar la selección de la operación
  onOperacionSelect(operacion: string) {
    this.selectedOperacion = operacion;
    console.log('Operación seleccionada:', this.selectedOperacion);
  } */