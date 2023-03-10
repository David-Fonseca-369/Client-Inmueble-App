import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //hijos
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'static',
        loadChildren: () =>
          import('./pages/static/static.module').then((m) => m.StaticModule),
      },
      {
        path: '',
        pathMatch: 'full',
        //como ya se ha referenciado arriba, ya se pueden acceder a las páginas de static.
        redirectTo: 'static/welcome',
      },

      //importar lo de inmueble
      {
        path: 'inmueble',
        loadChildren: ()=> import('./pages/inmueble/inmueble.module').then(m => m.InmuebleModule)
      }
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
