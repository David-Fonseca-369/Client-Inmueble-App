import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from './spinner/spinner.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerModule //lo importo ha este modulo
  ],
  exports: [
    SpinnerModule //lo exporto para que sea publico
  ]


})
export class IndicatorsModule { }
