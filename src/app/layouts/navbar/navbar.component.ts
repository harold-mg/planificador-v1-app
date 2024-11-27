import { Component, OnInit, HostListener  } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que tienes el servicio de autenticación
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  actividadesMenuVisible = false;
  aprobarMenuVisible = false;
  informeMenuVisible = false;
  userRole: string = '';
  esPlanificador: boolean = false;
  esResponsableUnidad: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.userRole = user.rol; 
      this.esPlanificador = this.userRole === 'planificador';
      this.esResponsableUnidad = this.userRole === 'responsable_unidad';
    });
  }

  toggleActividadesMenu() {
    this.actividadesMenuVisible = !this.actividadesMenuVisible;
    this.aprobarMenuVisible = false; // Cerrar otros menús
    this.informeMenuVisible = false;
  }

  toggleAprobarMenu() {
    this.aprobarMenuVisible = !this.aprobarMenuVisible;
    this.actividadesMenuVisible = false; // Cerrar otros menús
    this.informeMenuVisible = false;
  }

  toggleInformeMenu() {
    this.informeMenuVisible = !this.informeMenuVisible;
    this.actividadesMenuVisible = false; // Cerrar otros menús
    this.aprobarMenuVisible = false;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    const actividadesMenu = document.querySelector('.navbar-item:nth-child(1) .submenu');
    const aprobarMenu = document.querySelector('.navbar-item:nth-child(2) .submenu');
    const informeMenu = document.querySelector('.navbar-item:nth-child(3) .submenu');

    const isInsideActividades = actividadesMenu?.contains(targetElement);
    const isInsideAprobar = aprobarMenu?.contains(targetElement);
    const isInsideInforme = informeMenu?.contains(targetElement);
    
    const isNavbarItem = targetElement.classList.contains('navbar-item');

    // Cerrar menús si el clic es fuera de ellos
    if (!isInsideActividades && !isInsideAprobar && !isInsideInforme && !isNavbarItem) {
      this.actividadesMenuVisible = false;
      this.aprobarMenuVisible = false;
      this.informeMenuVisible = false;
    }
  }
  verActividadesConVehiculo() {
    // Lógica para ver actividades con vehículo
  }

  verActividadesSinVehiculo() {
    // Lógica para ver actividades sin vehículo
  }

  verActividadesEnAuditorio() {
    // Lógica para ver actividades en auditorio
  }

  verActividadesVirtuales() {
    // Lógica para ver actividades virtuales
  }

  verActividadesExternas() {
    // Lógica para ver actividades externas
  }
  //RESPONSABLE DE PLANIFICACION
  aprobarPlanificadorConV(){
    this.router.navigate(['/aprobar-convehi-planificador']);
  }
  aprobarPlanificadorSinV(){
    this.router.navigate(['/aprobar-sinvehi-planificador']);
  }
  aprobarPlanificadorAudi(){
    this.router.navigate(['/aprobar-audi-planificador'])
  }
  aprobarPlanificadorVirt(){
    this.router.navigate(['/aprobar-virt-planificador'])
  }
  aprobarPlanificadorExte(){

  }
  //RESPONSABLE DE UNIDAD
  aprobarUnidadConV(){
    this.router.navigate(['/aprobar-convehi-unidad']);
  }
  aprobarUnidadSinV(){
    this.router.navigate(['/aprobar-sinvehi-unidad']);
  }
  aprobarUnidadAudi(){
    this.router.navigate(['/aprobar-audi-unidad'])
  }
  aprobarUnidadVirt(){
    this.router.navigate(['/aprobar-virt-unidad'])
  }
  aprobarUnidadExte(){

  }
  obtenerInformes(){
    this.router.navigate(['/reportes']);
  }
 
}
