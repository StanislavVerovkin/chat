import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyDAdKZjuUnWjwenjUxMmUrUd1LKjd7CIBE',
  authDomain: 'chat-b4481.firebaseapp.com',
  databaseURL: 'https://chat-b4481.firebaseio.com',
  storageBucket: 'chat-b4481.appspot.com',
  messagingSenderId: '340860809598'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
