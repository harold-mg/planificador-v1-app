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
import { CoordinacionListComponent } from './components/coordinacion/coordinacion-list/coordinacion-list.component';
import { CoordinacionEditComponent } from './components/coordinacion/coordinacion-edit/coordinacion-edit.component';
import { PoaListComponent } from './components/poa/poa-list/poa-list.component';
import { PoaEditComponent } from './components/poa/poa-edit/poa-edit.component';
import { VehiculoListComponent } from './components/vehiculo/vehiculo-list/vehiculo-list.component';
import { VehiculoEditComponent } from './components/vehiculo/vehiculo-edit/vehiculo-edit.component';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { MunicipioEditComponent } from './components/municipio/municipio-edit/municipio-edit.component';
import { CentroSaludListComponent } from './components/centro-salud/centro-salud-list/centro-salud-list.component';
import { CentroSaludEditComponent } from './components/centro-salud/centro-salud-edit/centro-salud-edit.component';
import { OperacionesListComponent } from './components/operaciones/operaciones-list/operaciones-list.component';
import { OperacionesEditComponent } from './components/operaciones/operaciones-edit/operaciones-edit.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { ActividadSinVehiculoFormComponent } from './components/actividad-sin-vehiculo/actividad-sin-vehiculo-form/actividad-sin-vehiculo-form.component';
import { AprobarSinVPlanificadorComponent } from './components/actividad-sin-vehiculo/aprobar-sinv-planificador/aprobar-sinv-planificador.component';
import { AprobarSinvUnidadComponent } from './components/actividad-sin-vehiculo/aprobar-sinv-unidad/aprobar-sinv-unidad.component';
import { ReportesSinVehiculoComponent } from './components/reports/reportes-sin-vehiculo/reportes-sin-vehiculo.component';
import { ActividadAuditorioFormComponent } from './components/actividad-auditorio/actividad-auditorio-form/actividad-auditorio-form.component';
import { AprobarAudiPlanificadorComponent } from './components/actividad-auditorio/aprobar-audi-planificador/aprobar-audi-planificador.component';
import { AprobarAudiUnidadComponent } from './components/actividad-auditorio/aprobar-audi-unidad/aprobar-audi-unidad.component';
import { NotiVehiculoComponent } from './components/notificaciones/noti-vehiculo/noti-vehiculo.component';
import { NotiSinVehiculoComponent } from './components/notificaciones/noti-sinvehiculo/noti-sinvehiculo.component';
import { NotiAuditorioComponent } from './components/notificaciones/noti-auditorio/noti-auditorio.component';
import { NotificacionesComponent } from './layouts/notificaciones/notificaciones.component';
import { SubirInicioComponent } from './layouts/subir-inicio/subir-inicio.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ActividadVirtualFormComponent } from './components/actividad-virtual/actividad-virtual-form/actividad-virtual-form.component';
import { AprobarVirtPlanificadorComponent } from './components/actividad-virtual/aprobar-virt-planificador/aprobar-virt-planificador.component';
import { AprobarVirtUnidadComponent } from './components/actividad-virtual/aprobar-virt-unidad/aprobar-virt-unidad.component';
import { BackgroundComponent } from './layouts/background/background.component';
import { CalendarioConVehiculoComponent } from './components/herramientas/calendario-actividades/calendario-con-vehiculo/calendario-con-vehiculo.component';
import { CalendarioSinVehiculoComponent } from './components/herramientas/calendario-actividades/calendario-sin-vehiculo/calendario-sin-vehiculo.component';
import { CalendarioAuditorioComponent } from './components/herramientas/calendario-actividades/calendario-auditorio/calendario-auditorio.component';
import { CalendarioVirtualComponent } from './components/herramientas/calendario-actividades/calendario-virtual/calendario-virtual.component';
import { CalendarioExternaComponent } from './components/herramientas/calendario-actividades/calendario-externa/calendario-externa.component';
import { ReportesAuditorioComponent } from './components/reports/reportes-auditorio/reportes-auditorio.component';
import { ReportesVirtualComponent } from './components/reports/reportes-virtual/reportes-virtual.component';
import { ReportesExternaComponent } from './components/reports/reportes-externa/reportes-externa.component';

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
    //CalendarioActividadesComponent,
    CoordinacionListComponent,
    CoordinacionEditComponent,
    PoaListComponent,
    PoaEditComponent,
    VehiculoListComponent,
    VehiculoEditComponent,
    MunicipioListComponent,
    MunicipioEditComponent,
    CentroSaludListComponent,
    CentroSaludEditComponent,
    OperacionesListComponent,
    OperacionesEditComponent,
    UsuarioListComponent,
    UsuarioEditComponent,
    ActividadSinVehiculoFormComponent,
    AprobarSinVPlanificadorComponent,
    AprobarSinvUnidadComponent,
    ReportesSinVehiculoComponent,
    ActividadAuditorioFormComponent,
    AprobarAudiPlanificadorComponent,
    AprobarAudiUnidadComponent,
    NotiVehiculoComponent,
    NotiSinVehiculoComponent,
    NotiAuditorioComponent,
    NotificacionesComponent,
    SubirInicioComponent,
    ModalComponent,
    ActividadVirtualFormComponent,
    AprobarVirtPlanificadorComponent,
    AprobarVirtUnidadComponent,
    BackgroundComponent,
    CalendarioConVehiculoComponent,
    CalendarioSinVehiculoComponent,
    CalendarioAuditorioComponent,
    CalendarioVirtualComponent,
    CalendarioExternaComponent,
    ReportesAuditorioComponent,
    ReportesVirtualComponent,
    ReportesExternaComponent,
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
