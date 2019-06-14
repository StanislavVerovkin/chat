import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  messages = this.socket.fromEvent<string[]>('messages');

  constructor(private socket: Socket) {
  }

  newMessage(message) {
    this.socket.emit('addMessage', {message: message});
  }
}
