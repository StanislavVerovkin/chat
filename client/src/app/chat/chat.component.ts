import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {MessageModel} from '../models/message.model';
import {Observable} from 'rxjs';

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
    this.messages = this.socketService.getMessages();
  }

  chatSend(theirMessage: string) {
    this.socketService.newMessage(theirMessage);
    this.msgVal = '';
  }

  removeMessage(id) {
    this.socketService.deleteMessage(id);
  }
}
