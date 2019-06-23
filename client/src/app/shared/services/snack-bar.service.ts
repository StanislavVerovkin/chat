import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  getSnackBarError(errorMessage) {
    this.snackBar.open(errorMessage, 'Close', {duration: 5000});
  }
}
