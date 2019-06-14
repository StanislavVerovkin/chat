import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs/internal/Observable';
import {MessageModel} from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  msgVal = '';
  messages: Observable<MessageModel[]>;

  constructor(
    private socketService: SocketService,
  ) {
  }

  ngOnInit() {
    this.messages = this.socketService.messages;
  }

  chatSend(theirMessage: string) {
    this.socketService.newMessage(theirMessage);
    this.msgVal = '';
  }

  removeMessage(id) {
    this.socketService.deleteMessage(id);
  }
}
