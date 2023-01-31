import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  //como sus representantes son su módulos se llama el modulo mas no el componente
  {
    path: 'welcome', // para llamar al módulo lo tengo que llamar como si fuera un hijo
    loadChildren: ()=>  import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard]
    //las rutas comienzan a nivel de static porque el module.static inicia buscar desde ahí
  },
  {
    path: '404',
    loadChildren: ()=> import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

//se registra en el módulo app.module
export class StaticRoutingModule { }
