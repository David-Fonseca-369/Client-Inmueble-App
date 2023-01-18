import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';

// @Injectable({
//   providedIn: 'root'
// })

//eliminamos el 'root', para que no sea referencias desde la raíz
@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_error'],
    });
  }

  success(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      panelClass: ['mat-snackbar_success'],
      data: { message },
    });
  }
}
