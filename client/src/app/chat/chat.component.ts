import {Component, OnInit} from '@angular/core';
import {MessageModel} from '../models/message.model';
import {Observable} from 'rxjs/internal/Observable';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

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

  removeMessage(message) {
    this.socketService.deleteMessage(message);
  }
}
