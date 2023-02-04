import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmuebleListComponent } from './inmueble-list.component';

const routes: Routes = [
  {
    path : '',
    component : InmuebleListComponent
  }
  //configurar en su padre 'inmueble-routing'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleListRoutingModule { }
