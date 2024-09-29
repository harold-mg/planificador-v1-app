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
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { RegistrarUnidadComponent } from './components/registrar-unidad/registrar-unidad.component';
import { RegistrarAreaComponent } from './components/registrar-area/registrar-area.component';
import { PoaFormComponent } from './components/poa-form/poa-form.component';
import { CoordinacionFormComponent } from './components/coordinacion-form/coordinacion-form.component';
import { MunicipioFormComponent } from './components/municipio-form/municipio-form.component';
import { CentroSaludFormComponent } from './components/centro-salud-form/centro-salud-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistroUsuarioComponent,
    RegistrarUnidadComponent,
    RegistrarAreaComponent,
    PoaFormComponent,
    CoordinacionFormComponent,
    MunicipioFormComponent,
    CentroSaludFormComponent
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
