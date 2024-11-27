import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadVirtualService } from 'src/app/services/actividad-virtual.service';
import { Router } from '@angular/router';
import { PoaService } from 'src/app/services/poa.service';
import { AuthService } from 'src/app/services/auth.service';
import { CoordinacionService } from 'src/app/services/coordinacion.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actividad-virtual-form',
  templateUrl: './actividad-virtual-form.component.html',
  styleUrls: ['./actividad-virtual-form.component.scss']
})
export class ActividadVirtualFormComponent {
  actividadForm: FormGroup;
  poas: any[] = [];
  selectedCoordinacionId: number | null = null;
  selectedMunicipioId: number | null = null;
  coordinaciones: any[] = [];
  municipios: any[] = [];
  loading = false;
  isPlanificador: boolean = false;
  codigoPoa: string = ''; // Ejemplo de código POA predefinido
  operaciones: any[] = []; // Para almacenar las operaciones en un array
  selectedOperacion: string = ''; // Para almacenar la operación seleccionada
  selectedOperacionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private actividadVirtualService: ActividadVirtualService,
    private poaService: PoaService,
    private router: Router,
    private coordinacionService: CoordinacionService,
    private municipioService: MunicipioService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.actividadForm = this.fb.group({
      poa_id: ['', Validators.required],
      detalle_operacion: ['', Validators.required],
      tipo_actividad: ['', Validators.required],
      operacion: [''],
      resultados_esperados: ['', Validators.required],
      fecha: ['', Validators.required],  // Fecha de la actividad
      hora_inicio: ['', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):([0-5][0-9])$')]],  // Hora de inicio
      hora_fin: ['', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):([0-5][0-9])$')]],  // Hora de fin
      lugar: ['', Validators.required],  // Campo de texto para la plataforma
      tecnico_a_cargo: ['', Validators.required],  // Técnico a cargo
      participantes: ['', [Validators.required, Validators.min(1)]],  // Número de participantes
      //observaciones: [''],  // Observaciones adicionales
      usuario_id: [''],  // Este campo se llenará automáticamente con el ID del usuario
    });
  }

  ngOnInit(): void {
    this.loadPoas();
    this.loadCoordinaciones();
    this.loadMunicipios();
    this.setUsuarioId();
    //this.checkUserRole(); // Verifica si el usuario es planificador
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

  checkUserRole(): void {
    this.authService.getUserRole().subscribe((role) => {
      this.isPlanificador = role === 'planificador';
      if (!this.isPlanificador) {
        // Deshabilitar la opción de asignación de vehículos, si es necesario
        // this.actividadForm.get('vehiculo_id')?.disable(); // No es necesario para este caso
      }
    });
  }

  onSubmit(): void {
    console.log('Datos a enviar al backend:', this.actividadForm.value);
    if (this.actividadForm.valid) {
      this.loading = true;
      console.log(this.actividadForm.valid)
      this.actividadVirtualService.createActividadVirtual(this.actividadForm.value).subscribe({
        next: () => {
          console.log('Actividad virtual registrada exitosamente');
          alert('Actividad virtual registrada exitosamente');
          window.location.reload(); // Recargar la página después del registro
        },
        error: (err) => {
          console.error('Error al registrar la actividad virtual:', err);
          this.loading = false; // Detener el loading si hay un error
        }
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
