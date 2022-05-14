import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar:MatSnackBar) { }

  alert(message:any) {
    this.snackBar.openFromComponent(AlertComponent, {
      data:message,
      duration:3000,
      verticalPosition: 'top'
    });
  }

  showAlert(message: any) {
    this.alert(message);
  }
}
