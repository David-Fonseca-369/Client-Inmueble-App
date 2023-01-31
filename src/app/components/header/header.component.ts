import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserResponse } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  @Input() user!: UserResponse | null;
  //saber si el usuario está en sesión o no
  @Input() isAuthorized!: boolean | null;

  //botón salir sesión, dispara evento
  @Output() signOut = new EventEmitter<void>();

  constructor() {}
  ngOnInit(): void {}

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }
  onSignOut(): void {
    //emite al componente padre para que notifique que se desea salir de sesión
    this.signOut.emit();
  }
}
