import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que tienes el servicio de autenticación para obtener el rol

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userRole: string = ''; // Variable para almacenar el rol del usuario
  sidebarOpen = false;
  hasImage: boolean = false;
  menus = [
    {
      name: 'Usuarios',
      isOpen: false,
      routes: {
        view: '/ver-usuario',
        create: '/registrar-usuario',
      },
      roles: ['planificador'], // Solo visible para planificadores
    },
    {
      name: 'Unidades',
      isOpen: false,
      routes: {
        view: '/ver-unidad',
        create: '/registrar-unidad',
      },
      roles: ['planificador'], // Visible para todos estos roles
    },
    {
      name: 'Áreas',
      isOpen: false,
      routes: {
        view: '/ver-area',
        create: '/registrar-area',
      },
      roles: ['planificador'], // Solo visible para planificadores y responsables de área
    },
    {
      name: 'Coordinaciones',
      isOpen: false,
      routes: {
        view: '/ver-coordinacion', // No definido aún
        create: '/registrar-coordinacion',
      },
      roles: ['planificador'],
    },
    {
      name: 'Municipios',
      isOpen: false,
      routes: {
        view: '/ver-municipio',
        create: '/registrar-municipio',
      },
      roles: ['planificador'],
    },
    {
      name: 'Centros de Salud',
      isOpen: false,
      routes: {
        view: '/ver-centro-salud',
        create: '/registrar-centro-salud',
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'],
    },
    {
      name: 'POAs',
      isOpen: false,
      routes: {
        view: '/ver-poa',
        create: '/registrar-poa',
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'],
    },
    {
      name: 'Operaciones',
      isOpen: false,
      routes: {
        view: '/ver-operaciones',
        create: '/registrar-operaciones',
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'],
    },
    {
      name: 'Vehículos',
      isOpen: false,
      routes: {
        view: '/ver-vehiculo',
        create: '/registrar-vehiculo',
      },
      roles: ['planificador'],
    },
    // Agrega otros menús con la propiedad 'roles'
  ];

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    // Suscribirse al observable para obtener el rol del usuario
    this.authService.getUser().subscribe(user => {
      this.userRole = user.rol; // Asegúrate de que el objeto usuario contiene el rol
    });
  }  // Función para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  getFilteredMenus() {
    return this.menus.filter(menu => menu.roles.includes(this.userRole));
  }

  toggleMenu(menu: any) {
    menu.isOpen = !menu.isOpen;
  }
  closeSidebar() {
    this.sidebarOpen = false;
  }
  detectImagePresence() {
    // Lógica para detectar si hay una imagen en la parte superior, por ejemplo:
    const imageElement = document.querySelector('#portada_inicio');
    this.hasImage = imageElement !== null;
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
