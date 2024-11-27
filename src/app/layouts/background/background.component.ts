import { Component, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-background',
  template: '',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor(private backgroundService: BackgroundService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de fondo
    this.backgroundService.background$.subscribe(backgroundType => {
      this.setBackgroundClass(backgroundType);
    });
  }

  private setBackgroundClass(backgroundType: string): void {
    // Primero, eliminamos todas las clases de fondo anteriores
    document.body.classList.remove('background-default', 'background-animated', 'background-static');
    
    // Añadimos la clase correspondiente según el tipo de fondo seleccionado
    document.body.classList.add(`background-${backgroundType}`);
  }
}
