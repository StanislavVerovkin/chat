import {Component} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items = [];
  name: any;
  msgVal = '';

  constructor(
    public db: AngularFireDatabase,
    private af: AngularFireAuth,
  ) {

    this.db.list('/messages')
      .valueChanges()
      .subscribe((data) => {
        this.items = data;
      });

    this.af.authState
      .subscribe((auth) => {
        if (auth) {
          this.name = auth.displayName;
        }
      });
  }

  login() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  chatSend(theirMessage: string) {
    this.db.list('messages').push({
      message: theirMessage,
      name: this.name,
    });
    this.msgVal = '';
  }
}
