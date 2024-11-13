import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoaService } from 'src/app/services/poa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poa-edit',
  templateUrl: './poa-edit.component.html',
  styleUrls: ['./poa-edit.component.scss']
})
export class PoaEditComponent implements OnInit {
  poaForm: FormGroup;
  poaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private poaService: PoaService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.poaForm = this.fb.group({
      codigo_poa: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.poaId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerPoa();
  }

  obtenerPoa() {
    this.poaService.getPoaById(this.poaId).subscribe(
      (data) => {
        this.poaForm.patchValue(data);  // Cargar los datos del POA en el formulario
      },
      (error) => {
        console.error('Error al obtener el POA', error);
      }
    );
  }

  actualizarPoa() {
    if (this.poaForm.valid) {
      this.poaService.updatePoa(this.poaId, this.poaForm.value).subscribe(
        () => {
          alert('POA actualizado con éxito');
          this.router.navigate(['/ver-poa']);  // Redirigir a la lista de POAs
        },
        (error) => {
          console.error('Error al actualizar el POA', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/ver-poa']);
  }
}
