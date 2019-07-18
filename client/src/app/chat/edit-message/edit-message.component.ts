import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../shared/services/socket.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {

  form: FormGroup;
  fb = new FormBuilder();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditMessageComponent>,
    private socketService: SocketService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      'message': new FormControl('', [
        Validators.required
      ])
    });
    this.socketService.getMessageById(this.data)
      .subscribe((data) => {
        this.form.patchValue({
          message: data.message
        });
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(value) {
    this.socketService.updateMessageById(this.data, value.message)
      .pipe(
        switchMap(() => this.socketService.getMessages())
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
