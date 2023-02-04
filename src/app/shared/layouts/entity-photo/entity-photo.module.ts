import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityPhotoComponent } from './entity-photo.component';



@NgModule({
  declarations: [
    EntityPhotoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    //que se exporte
    EntityPhotoComponent
  ]
})
export class EntityPhotoModule { }
