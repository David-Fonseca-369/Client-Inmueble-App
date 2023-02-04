import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-entity-photo',
  templateUrl: './entity-photo.component.html',
  styleUrls: ['./entity-photo.component.scss']
})
export class EntityPhotoComponent implements OnInit{
  @Input() photoURL! : string;

  constructor(private sanitizer: DomSanitizer){

  }
  ngOnInit(): void {
  }


  get safePhotoURL() :SafeStyle | null{
    //si no está en blanco, trata la imagen, si no es nulo
    return this.photoURL ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`) : null
  }

}
