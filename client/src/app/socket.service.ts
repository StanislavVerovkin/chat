import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {MessageModel} from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  messages = this.socket.fromEvent<MessageModel[]>('messages');

  constructor(private socket: Socket) {
    this.messages.subscribe(x => console.log(x));
  }

  newMessage(message) {
    this.socket.emit('addMessage', {id: this.messageId(), message: message});
  }

  deleteMessage(id) {
    this.socket.emit('removeMessage', {id});
  }

  private messageId() {
    let text = '';
    const possible = '0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
