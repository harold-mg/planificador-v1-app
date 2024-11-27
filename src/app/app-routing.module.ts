import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form.component';
import { UnidadFormComponent } from './components/unidad/unidad-form.component';
import { AreaFormComponent } from './components/area/area-form/area-form.component';
import { PoaFormComponent } from './components/poa/poa-form.component';
import { CoordinacionFormComponent } from './components/coordinacion/coordinacion-form/coordinacion-form.component';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { CentroSaludFormComponent } from './components/centro-salud/centro-salud-form/centro-salud-form.component';
import { VehiculoFormComponent } from './components/vehiculo/vehiculo-form.component';
import { ActividadVehiculoFormComponent } from './components/actividad-vehiculo/actividad-vehiculo-form/actividad-vehiculo-form.component';
import { OperacionesFormComponent } from './components/operaciones/operaciones-form.component';

import { UnidadListComponent } from './components/unidad/unidad-list/unidad-list.component';
import { UnidadEditComponent } from './components/unidad/unidad-edit/unidad-edit.component';
import { AreaListComponent } from './components/area/area-list/area-list.component';
import { AreaEditComponent } from './components/area/area-edit/area-edit.component';

import { AprobarConvUnidadComponent } from './components/actividad-vehiculo/aprobar-conv-unidad/aprobar-conv-unidad.component';
import { AprobarConvPlanificadorComponent } from './components/actividad-vehiculo/aprobar-conv-planificador/aprobar-conv-planificador.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ActividadConvEditComponent } from './components/actividad-vehiculo/actividad-conv-edit/actividad-conv-edit.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { CoordinacionListComponent } from './components/coordinacion/coordinacion-list/coordinacion-list.component';
import { CoordinacionEditComponent } from './components/coordinacion/coordinacion-edit/coordinacion-edit.component';
import { PoaListComponent } from './components/poa/poa-list/poa-list.component';
import { PoaEditComponent } from './components/poa/poa-edit/poa-edit.component';
import { VehiculoListComponent } from './components/vehiculo/vehiculo-list/vehiculo-list.component';
import { VehiculoEditComponent } from './components/vehiculo/vehiculo-edit/vehiculo-edit.component';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { MunicipioEditComponent } from './components/municipio/municipio-edit/municipio-edit.component';
import { CentroSaludEditComponent } from './components/centro-salud/centro-salud-edit/centro-salud-edit.component';
import { CentroSaludListComponent } from './components/centro-salud/centro-salud-list/centro-salud-list.component';
import { OperacionesListComponent } from './components/operaciones/operaciones-list/operaciones-list.component';
import { OperacionesEditComponent } from './components/operaciones/operaciones-edit/operaciones-edit.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { ActividadSinVehiculoFormComponent } from './components/actividad-sin-vehiculo/actividad-sin-vehiculo-form/actividad-sin-vehiculo-form.component';
import { AprobarSinVPlanificadorComponent } from './components/actividad-sin-vehiculo/aprobar-sinv-planificador/aprobar-sinv-planificador.component';
import { AprobarSinvUnidadComponent } from './components/actividad-sin-vehiculo/aprobar-sinv-unidad/aprobar-sinv-unidad.component';
import { ActividadAuditorioFormComponent } from './components/actividad-auditorio/actividad-auditorio-form/actividad-auditorio-form.component';
import { AprobarAudiPlanificadorComponent } from './components/actividad-auditorio/aprobar-audi-planificador/aprobar-audi-planificador.component';
import { AprobarAudiUnidadComponent } from './components/actividad-auditorio/aprobar-audi-unidad/aprobar-audi-unidad.component';
import { ActividadVirtualFormComponent } from './components/actividad-virtual/actividad-virtual-form/actividad-virtual-form.component';
import { AprobarVirtUnidadComponent } from './components/actividad-virtual/aprobar-virt-unidad/aprobar-virt-unidad.component';
import { AprobarVirtPlanificadorComponent } from './components/actividad-virtual/aprobar-virt-planificador/aprobar-virt-planificador.component';


const routes: Routes = [
  //PAGINAS
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'reportes', component: ReportesComponent},
  //DIRECCIONES DONDE SE REGISTRAN NUEVOS DATOS
  { path: 'registrar-usuario', component: UsuarioFormComponent},
  { path: 'registrar-unidad', component: UnidadFormComponent},
  { path: 'registrar-area', component: AreaFormComponent},
  { path: 'registrar-poa', component: PoaFormComponent},
  { path: 'registrar-coordinacion', component: CoordinacionFormComponent},
  { path: 'registrar-municipio', component: MunicipioFormComponent},
  { path: 'registrar-centro-salud', component: CentroSaludFormComponent},
  { path: 'registrar-operaciones', component: OperacionesFormComponent},
  { path: 'registrar-vehiculo', component: VehiculoFormComponent},
  //CREACION DE ACTIVIDADES
  { path: 'actividad-vehiculo', component: ActividadVehiculoFormComponent},
  { path: 'actividad-sin-vehiculo', component: ActividadSinVehiculoFormComponent},
  { path: 'actividad-auditorio', component: ActividadAuditorioFormComponent},
  { path: 'actividad-virtual', component: ActividadVirtualFormComponent},

  //DIRECCIONES PARA VER LOS COMPONENTES
  { path: 'ver-usuario', component: UsuarioListComponent },
  { path: 'ver-unidad', component: UnidadListComponent },
  { path: 'ver-area', component: AreaListComponent },
  { path: 'ver-poa', component: PoaListComponent },
  { path: 'ver-operaciones', component: OperacionesListComponent},
  { path: 'ver-coordinacion', component: CoordinacionListComponent },
  { path: 'ver-municipio', component: MunicipioListComponent },
  { path: 'ver-centro-salud', component: CentroSaludListComponent },
  { path: 'ver-vehiculo', component: VehiculoListComponent },

  //DIRECCIONES PARA EDITAR COMPONENTES
  { path: 'edit-usuario/:id', component: UsuarioEditComponent },
  { path: 'editar-usuario/:id', component: UsuarioEditComponent },
  { path: 'editar-unidad/:id', component: UnidadEditComponent },
  { path: 'editar-area/:id', component: AreaEditComponent },
  { path: 'editar-poa/:id', component: PoaEditComponent },
  { path: 'editar-operaciones/:id', component: OperacionesEditComponent},
  { path: 'editar-coordinacion/:id', component: CoordinacionEditComponent },
  { path: 'editar-municipio/:id', component: MunicipioEditComponent },
  { path: 'editar-centro-salud/:id', component: CentroSaludEditComponent },
  { path: 'editar-conv/:id', component: ActividadConvEditComponent},
  { path: 'editar-vehiculo/:id', component: VehiculoEditComponent },
  //DIRECCIONES PARA APROBAR ACTIVIDADES
  { path: 'aprobar-convehi-planificador', component: AprobarConvPlanificadorComponent},
  { path: 'aprobar-convehi-unidad', component: AprobarConvUnidadComponent },
  { path: 'aprobar-sinvehi-planificador', component: AprobarSinVPlanificadorComponent},
  { path: 'aprobar-sinvehi-unidad', component: AprobarSinvUnidadComponent},
  { path: 'aprobar-audi-planificador', component: AprobarAudiPlanificadorComponent},
  { path: 'aprobar-audi-unidad', component: AprobarAudiUnidadComponent},
  { path: 'aprobar-virt-planificador', component: AprobarVirtPlanificadorComponent},
  { path: 'aprobar-virt-unidad', component: AprobarVirtUnidadComponent},

  //
  { path: '**', redirectTo: 'login' }  // Redirección por defecto
  //{path: '', redirectTo: '/dasboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
