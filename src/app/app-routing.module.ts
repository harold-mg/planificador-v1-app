import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form.component';
import { UnidadFormComponent } from './components/unidad/unidad-form.component';
import { AreaFormComponent } from './components/area/area-form.component';
import { PoaFormComponent } from './components/poa/poa-form.component';
import { CoordinacionFormComponent } from './components/coordinacion/coordinacion-form.component';
import { MunicipioFormComponent } from './components/municipio/municipio-form.component';
import { CentroSaludFormComponent } from './components/centro-salud/centro-salud-form.component';
import { VehiculoFormComponent } from './components/vehiculo/vehiculo-form.component';
import { ActividadVehiculoFormComponent } from './components/actividad-vehiculo/actividad-vehiculo-form.component';
import { OperacionesFormComponent } from './components/operaciones/operaciones-form.component';

import { UnidadListComponent } from './components/unidad/unidad-list/unidad-list.component';
import { UnidadEditComponent } from './components/unidad/unidad-edit/unidad-edit.component';
import { AreaListComponent } from './components/area/area-list/area-list.component';
import { AreaEditComponent } from './components/area/area-edit/area-edit.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent},
  //DIRECCIONES DONDE SE REGISTRAN NUEVOS DATOS
  {path: 'registrar-usuario', component: UsuarioFormComponent},
  {path: 'registrar-unidad', component: UnidadFormComponent},
  {path: 'registrar-area', component: AreaFormComponent},
  {path: 'registrar-poa', component: PoaFormComponent},
  {path: 'registrar-coordinacion', component: CoordinacionFormComponent},
  {path: 'registrar-municipio', component: MunicipioFormComponent},
  {path: 'registrar-centro-salud', component: CentroSaludFormComponent},
  {path: 'registrar-vehiculo', component: VehiculoFormComponent},
  { path: 'registrar-operaciones', component: OperacionesFormComponent},
  {path: 'actividad-vehiculo', component: ActividadVehiculoFormComponent},
  //DIRECCIONES PARA VER LOS COMPONENTES
  { path: 'ver-unidad', component: UnidadListComponent },
  { path: 'ver-area', component: AreaListComponent },

  //DIRECCIONES PARA EDITAR COMPONENTES
  { path: 'editar-unidad/:id', component: UnidadEditComponent },
  { path: 'editar-area/:id', component: AreaEditComponent },
  //
  { path: '**', redirectTo: 'login' }  // Redirección por defecto
  //{path: '', redirectTo: '/dasboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
