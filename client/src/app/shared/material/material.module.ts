import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatSidenavModule,
  MatSnackBarModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatDialogModule
  ],
})
export class MaterialModule {

}
