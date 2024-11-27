import { Component, OnInit, AfterViewChecked, ChangeDetectorRef  } from '@angular/core';
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
export class ActividadVehiculoFormComponent implements OnInit, AfterViewChecked {
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
  //cdr: any;

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
    private cdr: ChangeDetectorRef,
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
      //estado_aprobacion: ['pendiente'],
      //observaciones: [''],
      usuario_id: [''], // Este campo se llenará automáticamente con el ID del usuario
      //estado_aprobacion: [''], // Este campo se llenará automáticamente con el valor 'pendiente'
      
    });
  }

  ngOnInit(): void {
    this.mostrarSiguienteMes()
    this.loadPoas();
    this.loadCoordinaciones();
    this.loadMunicipios();
    this.loadCentrosSalud();
    // Llamamos al método para obtener el ID del usuario autenticado
    this.setUsuarioId();
    // Establecemos el estado de aprobación por defecto como 'pendiente'
    //this.actividadForm.get('estado_aprobacion')?.setValue('pendiente');
  }
  ngAfterViewChecked(): void {
    // Este método se ejecutará después de que Angular haya renderizado la vista,
    // asegurándonos de que las restricciones de fecha se apliquen cada vez que el formulario se vuelva a renderizar.
    this.mostrarSiguienteMes();
    this.cdr.detectChanges();  // Forzar la detección de cambios para aplicar correctamente las restricciones
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
  mostrarSiguienteMes() {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 = January, 1 = February, etc.
    const currentYear = today.getFullYear();

    // Calcular el primer día del mes siguiente
    const nextMonthStart = new Date(currentYear, currentMonth + 1, 1); // Primer día del siguiente mes

    // Calcular el último día del mes siguiente
    const nextMonthEnd = new Date(currentYear, currentMonth + 2, 0); // Último día del siguiente mes

    // Formatear las fechas para el formato YYYY-MM-DD
    const startDate = nextMonthStart.toISOString().split('T')[0];
    const endDate = nextMonthEnd.toISOString().split('T')[0];

    // Actualizar los valores mínimos y máximos para los campos de fecha
    const fechaInicioInput = document.getElementById('fecha_inicio') as HTMLInputElement;
    const fechaFinInput = document.getElementById('fecha_fin') as HTMLInputElement;

    if (fechaInicioInput) {
      fechaInicioInput.setAttribute('min', startDate);  // Fecha mínima = 1 de diciembre
      fechaInicioInput.setAttribute('max', endDate);  // Fecha máxima = último día de diciembre
    }

    if (fechaFinInput) {
      fechaFinInput.setAttribute('min', startDate);  // Fecha mínima = 1 de diciembre
      fechaFinInput.setAttribute('max', endDate);  // Fecha máxima = último día de diciembre
    }

    // Si necesitas que el formulario tenga el valor inicial del primer día del siguiente mes:
    /* this.actividadForm.patchValue({
      fecha_inicio: startDate,
      fecha_fin: endDate
    }); */
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
      // Agregar observaciones solo si se proporciona
      /* const formData = {
        ...this.actividadForm.value,
        observaciones: this.actividadForm.get('observaciones')?.value || null, // Asignar null si no hay valor
      
      };
      console.log('Datos a enviar:', formData); // Verifica los datos */
      this.actividadService.createActividadVehiculo(this.actividadForm.value).subscribe({
        next: () => {
          console.log('actividad registrada exitosamente:');
          alert('Actividad con vehículo registrada exitosamente');
          //this.actividadForm.reset();
          window.location.reload();
          //this.router.navigate(['/actividad-vehiculo']);
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
