import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen: boolean = false; // Controla la visibilidad del modal
  @Input() title: string = ''; // Título del modal
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  menuMovil = false;

  closeModal() {
    this.isOpen = false;
    this.close.emit(); // Emitimos el evento para cerrar el modal
    
  }
  closeSidebar() {
    this.isOpen = false;
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (
      sidebar && !sidebar.contains(event.target as Node) &&
      hamburgerMenu && !hamburgerMenu.contains(event.target as Node)
    ) {
      this.closeSidebar();
    }
  }
}
