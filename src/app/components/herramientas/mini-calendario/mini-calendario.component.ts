import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-calendario',
  templateUrl: './mini-calendario.component.html',
  styleUrls: ['./mini-calendario.component.scss']
})
export class MiniCalendarioComponent {
  //selectedDate: string | null = null; // Para almacenar la fecha seleccionada
  days: number[] = [];
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();
  diasSemana: string[] = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // Rellenar el array de días con espacios vacíos para el primer día
    this.days = Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }

  nextMonth(): void {
    if (this.month === 11) {
      this.month = 0; // Volver a enero
      this.year++; // Incrementar el año
    } else {
      this.month++;
    }
    this.generateCalendar();
  }

  previousMonth(): void {
    if (this.month === 0) {
      this.month = 11; // Volver a diciembre
      this.year--; // Decrementar el año
    } else {
      this.month--;
    }
    this.generateCalendar();
  }
}
