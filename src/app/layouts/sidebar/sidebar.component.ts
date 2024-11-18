import { Component, ComponentFactoryResolver, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que tienes el servicio de autenticación para obtener el rol
import { UnidadFormComponent } from '../../components/unidad/unidad-form.component';
import { AreaFormComponent } from '../../components/area/area-form/area-form.component';
import { PoaFormComponent } from '../../components/poa/poa-form.component';
import { OperacionesFormComponent } from '../../components/operaciones/operaciones-form.component';
import { CoordinacionFormComponent } from '../../components/coordinacion/coordinacion-form/coordinacion-form.component';
import { MunicipioFormComponent } from '../../components/municipio/municipio-form/municipio-form.component';
import { CentroSaludFormComponent } from '../../components/centro-salud/centro-salud-form/centro-salud-form.component';
import { VehiculoFormComponent } from '../../components/vehiculo/vehiculo-form.component';
import { UsuarioFormComponent } from '../../components/usuario/usuario-form.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userRole: string = '';
  menuMovil = false;
  hasImage: boolean = false;
  modalOpen = false;
  modalTitle = '';
  modalContent: any;

  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: false }) dynamicComponent!: ViewContainerRef;

  menus = [
    {
      name: 'Usuarios',
      isOpen: false,
      routes: {
        view: '/ver-usuario',
        create: '/registrar-usuario',
      },
      roles: ['planificador'],
      createComponent: UsuarioFormComponent
    },
    {
      name: 'Unidades',
      isOpen: false,
      routes: {
        view: '/ver-unidad',
        create: '/registrar-unidad',
      },
      roles: ['planificador'],
      createComponent: UnidadFormComponent
    },
    {
      name: 'Áreas',
      isOpen: false,
      routes: {
        view: '/ver-area',
        create: '/registrar-area',
      },
      roles: ['planificador'],
      createComponent: AreaFormComponent
    },
    {
      name: 'POAs',
      isOpen: false,
      routes: {
        view: '/ver-poa',
        create: '/registrar-poa',
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'],
      createComponent: PoaFormComponent
    },
    {
      name: 'Operaciones',
      isOpen: false,
      routes: {
        view: '/ver-operaciones',
        create: '/registrar-operaciones',
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'],
      createComponent: OperacionesFormComponent
    },
    {
      name: 'Coordinaciones',
      isOpen: false,
      routes: {
        view: '/ver-coordinacion',
        create: '/registrar-coordinacion',
      },
      roles: ['planificador'],
      createComponent: CoordinacionFormComponent
    },
    {
      name: 'Municipios',
      isOpen: false,
      routes: {
        view: '/ver-municipio',
        create: '/registrar-municipio',
      },
      roles: ['planificador'],
      createComponent: MunicipioFormComponent
    },
    {
      name: 'Centros de Salud',
      isOpen: false,
      routes: {
        view: '/ver-centro-salud',
        create: '/registrar-centro-salud',
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'],
      createComponent: CentroSaludFormComponent
    },
    {
      name: 'Vehículos',
      isOpen: false,
      routes: {
        view: '/ver-vehiculo',
        create: '/registrar-vehiculo',
      },
      roles: ['planificador'],
      createComponent: VehiculoFormComponent
    },
  ];

  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.userRole = user.rol;
    });
  }

  toggleSidebar() {
    this.menuMovil = !this.menuMovil;
  }

  openModal(component: any, name: string) {
    this.modalOpen = true;
    this.modalTitle = 'Registrar ' + name;
    this.modalContent = component;

    // Clear the dynamic component container
    this.dynamicComponent.clear();

    // Dynamically load the component into the modal
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.dynamicComponent.createComponent(componentFactory);
  }

  closeModal() {
    this.modalOpen = false;
  }

  toggleMenu(menu: any) {
    menu.isOpen = !menu.isOpen;
  }

  getFilteredMenus() {
    return this.menus.filter(menu => menu.roles.includes(this.userRole));
  }
  detectImagePresence() {
    // Lógica para detectar si hay una imagen en la parte superior, por ejemplo:
    const imageElement = document.querySelector('#portada_inicio');
    this.hasImage = imageElement !== null;
  }
  closeSidebar() {
    this.menuMovil = false;
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