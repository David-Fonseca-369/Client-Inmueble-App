import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: ()=> import('./inmueble-nuevo/inmueble-nuevo.module').then(m => m.InmuebleNuevoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: ()=>  import('./inmueble-list/inmueble-list.module').then(m => m.InmuebleListModule),
    canActivate: [AuthGuard]
  }
  //configurar en su padre 'app-routing'

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleRoutingModule { }
