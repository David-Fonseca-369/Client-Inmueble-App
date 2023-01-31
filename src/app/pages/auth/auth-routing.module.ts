import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from '@app/guards/unauth/unauth.guard';

const routes: Routes = [
  //referencia a los módulos de login y registratiohn
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(
        (m) => m.LoginModule
      ),
      canActivate: [UnauthGuard]
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
      canActivate: [UnauthGuard]
  },
  {
    //Automáticamente te lleve al módulo de login para redireccionar
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
