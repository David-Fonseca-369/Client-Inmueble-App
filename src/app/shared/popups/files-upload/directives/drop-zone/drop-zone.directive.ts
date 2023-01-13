import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();

  //cuando el cursor está sobre mi zona, quiero ques e active el evento
  @Output() hovered = new EventEmitter<boolean>();


  constructor() { }


  //dejar caer archivo
  @HostListener('drop', ['$event'])
  onDrop($event:any){
    //evitar que se refrescar de la página
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);

    //suelta dentro de la zona
    this.hovered.emit(false);

  }

  //arrastrar
  @HostListener('dragover', ['$event'])
  onDragOver($event:any){
    $event.preventDefault();
    this.hovered.emit(true);

  }


  //salir del modo de arrastre
  @HostListener('dragleave', ['$event'])
  onDragLeave($event:any){
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
