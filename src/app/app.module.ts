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
 import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebase.config)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage()),
    provideAuth(()=> getAuth()),


    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IndicatorsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
