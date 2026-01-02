import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private _snackBar = inject(MatSnackBar);
  
  sucecess(messsage: string): void {
    this._snackBar.open(messsage, 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snak-bar-success-feedback'],
    });
  }

  error(messsage: string): void {
    this._snackBar.open(messsage, 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snak-bar-error-feedback'],
    });
  }

  warning(messsage: string): void {
    this._snackBar.open(messsage, 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snak-bar-warning-feedback'],
    });
  }
}
