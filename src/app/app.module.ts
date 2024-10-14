import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsuarioFormComponent,
    UnidadFormComponent,
    AreaFormComponent,
    PoaFormComponent,
    CoordinacionFormComponent,
    MunicipioFormComponent,
    CentroSaludFormComponent,
    VehiculoFormComponent,
    ActividadVehiculoFormComponent,
    OperacionesFormComponent,
    UnidadListComponent,
    UnidadEditComponent,
    AreaListComponent,
    AreaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
