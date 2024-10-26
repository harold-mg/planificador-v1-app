import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent {
  constructor(private router: Router) {}
  scrollToActivities() {
    const section = document.getElementById('activities-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  goToActividadConVwhiculo() {
    this.router.navigate(['/actividad-vehiculo']).then(() => {
      window.scrollTo(0, 0); // Desplaza a la parte superior
    });
  }
}
