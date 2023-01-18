import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent implements OnInit {
  isHovering!: boolean;

  files: File[] = [];

  //Se agrega el '!' por que no son inicializadas
  imageFile!: File;
  isError!: boolean;
  filesURLs: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  toggleHover(event: boolean) {
    //depende del evento que se reciba
    this.isHovering = event;
  }

  //suelta imagen
  onDrop(files: FileList): void {
    this.dropGeneral(files);
  }

  onDropFiles(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(files: FileList): void {
    this.isError = false;
    if (this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }

    //se agregue a memoria
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }

    console.log(files);
  }

  onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  onComplete(): void {
    //si es multiple o solo es un archivo
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    //devuelvo esa data al cerra el dialog
    this.dialogRef.close(res);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
