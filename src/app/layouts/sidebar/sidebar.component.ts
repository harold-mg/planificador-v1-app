import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que tienes el servicio de autenticación para obtener el rol

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userRole: string = ''; // Variable para almacenar el rol del usuario
  menus = [
    {
      name: 'Usuarios',
      isOpen: false,
      routes: {
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
        edit: '/editar-unidad/:id'
      },
      roles: ['planificador', 'responsable_unidad', 'responsable_area'], // Visible para todos estos roles
    },
    {
      name: 'Áreas',
      isOpen: false,
      routes: {
        view: '/ver-area',
        create: '/registrar-area',
        edit: '/editar-area/:id'
      },
      roles: ['planificador', 'responsable_area'], // Solo visible para planificadores y responsables de área
    },
    {
      name: 'Coordinaciones',
      isOpen: false,
      routes: {
        view: null, // No definido aún
        create: '/registrar-coordinacion',
        edit: null
      },
      roles: ['planificador'],
    },
    {
      name: 'Municipios',
      isOpen: false,
      routes: {
        view: null, // No definido aún
        create: '/registrar-municipio',
        edit: null
      },
      roles: ['planificador', 'responsable_unidad'],
    },
    {
      name: 'Centros de Salud',
      isOpen: false,
      routes: {
        view: null, // No definido aún
        create: '/registrar-centro-salud',
        edit: null
      },
      roles: ['planificador', 'responsable_unidad'],
    },
    {
      name: 'POAs',
      isOpen: false,
      routes: {
        view: null, // No definido aún
        create: '/registrar-poa',
        edit: null
      },
      roles: ['planificador'],
    },
    {
      name: 'Operaciones',
      isOpen: false,
      routes: {
        view: null, // No definido aún
        create: '/registrar-operaciones',
        edit: null
      },
      roles: ['planificador'],
    },
    {
      name: 'Vehículos',
      isOpen: false,
      routes: {
        view: null, // No definido aún
        create: '/registrar-vehiculo',
        edit: null
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
  }
  getFilteredMenus() {
    return this.menus.filter(menu => menu.roles.includes(this.userRole));
  }

  toggleMenu(menu: any) {
    menu.isOpen = !menu.isOpen;
  }
}
