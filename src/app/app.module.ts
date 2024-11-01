import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
import { AprobarConvUnidadComponent } from './components/actividad-vehiculo/aprobar-conv-unidad/aprobar-conv-unidad.component';
import { AprobarConvPlanificadorComponent } from './components/actividad-vehiculo/aprobar-conv-planificador/aprobar-conv-planificador.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CabeceraComponent } from './layouts/cabecera/cabecera.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ActividadesComponent } from './layouts/actividades/actividades.component';
import { ActividadConvEditComponent } from './components/actividad-vehiculo/actividad-conv-edit/actividad-conv-edit.component';
import { MiniCalendarioComponent } from './components/herramientas/mini-calendario/mini-calendario.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ReporteConVehiculoComponent } from './components/reports/reporte-con-vehiculo/reporte-con-vehiculo.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { MapaCriticoComponent } from './components/mapa-critico/mapa-critico.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CalendarioActividadesComponent } from './components/herramientas/calendario-actividades/calendario-actividades.component';

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
    AreaEditComponent,
    AprobarConvUnidadComponent,
    AprobarConvPlanificadorComponent,
    InicioComponent,
    CabeceraComponent,
    SidebarComponent,
    ActividadesComponent,
    ActividadConvEditComponent,
    MiniCalendarioComponent,
    NavbarComponent,
    ReporteConVehiculoComponent,
    ReportesComponent,
    MapaCriticoComponent,
    FooterComponent,
    CalendarioActividadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
