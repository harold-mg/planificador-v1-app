import { Component } from '@angular/core';

@Component({
  selector: 'app-subir-inicio',
  templateUrl: './subir-inicio.component.html',
  styleUrls: ['./subir-inicio.component.scss']
})
export class SubirInicioComponent {
    // Método para ir al top de la página
    subirAlInicio(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
