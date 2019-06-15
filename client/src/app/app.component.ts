import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs/internal/Observable';
import {MessageModel} from './models/message.model';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

}
