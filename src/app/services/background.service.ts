import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  // Inicializamos el BehaviorSubject con el valor 'default'
  private backgroundSubject: BehaviorSubject<string> = new BehaviorSubject<string>('default');

  constructor() {
    // Verificamos si hay un valor guardado en localStorage
    const savedBackground = localStorage.getItem('selectedBackground') || 'default';
    
    // Si hay un valor en localStorage, lo actualizamos en el BehaviorSubject
    this.backgroundSubject.next(savedBackground);
  }

  // Exponemos el observable para que otros componentes puedan suscribirse a los cambios
  background$ = this.backgroundSubject.asObservable();

  // Método para cambiar el fondo
  setBackground(backgroundType: string): void {
    // Guardamos la selección del fondo en localStorage
    localStorage.setItem('selectedBackground', backgroundType);
    this.backgroundSubject.next(backgroundType);
  }
}
