import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Importar el paquete principal de integración con firebase
import { AngularFireModule } from '@angular/fire/compat';

//Servicios de storage de Firebase
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//A la base de datos de firebase
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

//Servicio de autenticación
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Paquetes para inicializar los servicios
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

//servicios de instancia
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//servicios de instancia de autenticación
import { getAuth, provideAuth } from '@angular/fire/auth';

//referencias hacia el storage
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '@src/environments/environment';
import { IndicatorsModule } from './shared/indicators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupsModule } from './shared/popups';

import { NotificationModule } from './services';

import { MatSidenavModule } from "@angular/material/sidenav";

import {  MatToolbarModule} from "@angular/material/toolbar";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from './components/header/header.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MenuListComponent } from './components/menu-list/menu-list.component';

import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebase.config)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),

    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IndicatorsModule,
    BrowserAnimationsModule,
    PopupsModule,
    NotificationModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
