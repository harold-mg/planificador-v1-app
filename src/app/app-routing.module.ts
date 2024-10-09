import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { RegistrarUnidadComponent } from './components/registrar-unidad/registrar-unidad.component';
import { RegistrarAreaComponent } from './components/registrar-area/registrar-area.component';
import { PoaFormComponent } from './components/poa-form/poa-form.component';
import { CoordinacionFormComponent } from './components/coordinacion-form/coordinacion-form.component';
import { MunicipioFormComponent } from './components/municipio-form/municipio-form.component';
import { CentroSaludFormComponent } from './components/centro-salud-form/centro-salud-form.component';
import { VehiculoFormComponent } from './components/vehiculo-form/vehiculo-form.component';
import { ActividadVehiculoFormComponent } from './components/actividad-vehiculo-form/actividad-vehiculo-form.component';
import { OperacionesFormComponent } from './components/operaciones-form/operaciones-form.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'registrar-usuario', component: RegistroUsuarioComponent},
  {path: 'registrar-unidad', component: RegistrarUnidadComponent},
  {path: 'registrar-area', component: RegistrarAreaComponent},
  {path: 'registrar-poa', component: PoaFormComponent},
  {path: 'registrar-coordinacion', component: CoordinacionFormComponent},
  {path: 'registrar-municipio', component: MunicipioFormComponent},
  {path: 'registrar-centro-salud', component: CentroSaludFormComponent},
  {path: 'registrar-vehiculo', component: VehiculoFormComponent},
  {path: 'actividad-vehiculo', component: ActividadVehiculoFormComponent},
  { path: 'registrar-operaciones', component: OperacionesFormComponent},

  { path: '**', redirectTo: 'login' }  // Redirección por defecto
  //{path: '', redirectTo: '/dasboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
