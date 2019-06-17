import {Component, OnInit} from '@angular/core';
import {SocketService} from './shared/services/socket.service';
import {Observable} from 'rxjs/internal/Observable';
import {MessageModel} from './models/message.model';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
