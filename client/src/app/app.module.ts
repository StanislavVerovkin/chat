import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {environment} from '../environments/environment';

const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
