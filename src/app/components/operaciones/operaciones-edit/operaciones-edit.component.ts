import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperacionService } from 'src/app/services/operacion.service';
import { PoaService } from 'src/app/services/poa.service';  // Asegúrate de tener el servicio PoaService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operaciones-edit',
  templateUrl: './operaciones-edit.component.html',
  styleUrls: ['./operaciones-edit.component.scss']
})
export class OperacionesEditComponent implements OnInit {
  operacionForm: FormGroup;
  operacionId: number = 0;
  poas: any[] = []; // Aquí almacenamos los POAs

  constructor(
    private route: ActivatedRoute,
    private operacionService: OperacionService,
    private poaService: PoaService, // Asegúrate de tener este servicio
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario
    this.operacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      poa_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar los POAs al inicializar el componente
    this.loadPoas();

    // Obtener la ID de la operación desde la URL
    this.operacionId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerOperacion();
  }

  // Método para cargar los POAs
  loadPoas() {
    this.poaService.getPoas().subscribe(
      (data) => {
        this.poas = data; // Asignamos la respuesta a la variable poas
      },
      (error) => {
        console.error('Error al cargar los POAs', error);
      }
    );
  }

  // Obtener los detalles de la operación que se va a editar
  obtenerOperacion() {
    this.operacionService.getOperacionById(this.operacionId).subscribe(
      (data) => {
        this.operacionForm.patchValue(data); // Llenar el formulario con los datos de la operación
      },
      (error) => {
        console.error('Error al obtener la operación', error);
      }
    );
  }

  // Método para actualizar la operación
  updateOperacion() {
    if (this.operacionForm.valid) {
      this.operacionService.updateOperacion(this.operacionId, this.operacionForm.value).subscribe(
        () => {
          alert('Operación actualizada con éxito');
          this.router.navigate(['/ver-operaciones']);  // Redirigir a la lista de operaciones
        },
        (error) => {
          console.error('Error al actualizar la operación', error);
        }
      );
    }
  }

  // Método para cancelar la edición
  cancelar() {
    this.router.navigate(['/ver-operaciones']);  // Redirigir a la lista de operaciones
  }
}
