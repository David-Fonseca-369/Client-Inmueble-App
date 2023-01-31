import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
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

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuListComponent } from './components/menu-list/menu-list.component';

import { MatListModule } from '@angular/material/list';
import { AuthModule } from './pages/auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

//si no está en ambiente de producción  que el tamaño sea dinámico
const StoreDevtools = !environment.production
  ? StoreDevtoolsModule.instrument({ maxAge: 50 })
  : [];

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
    MatListModule,
    AuthModule,
    StoreDevtools,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
