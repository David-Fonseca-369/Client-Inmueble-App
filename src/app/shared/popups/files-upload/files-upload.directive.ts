import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]',
})
export class FilesUploadDirective {
  //si va permitir la subida o un archivo
  @Input() multiple!: boolean;

  //Para le edición de imagen
  @Input() crop!: boolean;

  //Evento manejador para almacenamiento
  @Output() changed = new EventEmitter<string | string[]>();

  constructor(private dialog: MatDialog) {}

  //Es un método decorador de angular que es usado para escuchar y manejar eventos del DOM
  @HostListener('click', ['event']) onClick() {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        multiple: this.multiple,
        crop : this.crop
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      //si selecciona que emita el resultado, si no que emita un null
      this.changed.emit(result || null);
    })
  }
}
