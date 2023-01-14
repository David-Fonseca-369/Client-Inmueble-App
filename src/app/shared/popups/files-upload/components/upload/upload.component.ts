import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage';

import { Observable, Subject, lastValueFrom } from 'rxjs';

import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;
  @Output() completed = new EventEmitter<string>();

  task!: AngularFireUploadTask;

  //por nomenclatura siempre se le pone uin signo de dólar a un Observable al final del nombre
  snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  percentage$!: Observable<number | undefined>;

  downloadURL!: string;
  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.startUpload();
  }

  //subir archivo al servidor de firebase
  startUpload(): void {
    //el mime type es este - image/jpg
    //lo divida en dos por el '/' y obtenga el primer elemento. 'image'
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${
      this.file.name
    }`;

    //image/4154.jpg
    //docx/454.docx
    //el mime type es este

    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    //para saber el porcentaje en cual se está subiendo el archivo
    this.percentage$ = this.task.percentageChanges();

    //snapshot del estado actual de la imagen
    this.snapshot$ = this.task.snapshotChanges() as Observable<
      UploadTaskSnapshot | undefined
    >;

    //Va a estar evaluando la tarea de subida del servidor
    this.snapshot$
      .pipe(
        //cuando termine la tarea
        takeUntil(this.destroy),
        finalize(async () => {
          //cuando termine la tarea se ejecute la siguiente lógica
          //obtener la url
          const storageRefObservable$ = storageRef.getDownloadURL();
          this.downloadURL = await lastValueFrom(storageRefObservable$);
          this.completed.next(this.downloadURL);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
