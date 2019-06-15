import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {MessageModel} from './models/message.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  messages = this.socket.fromEvent<MessageModel[]>('messages');

  constructor(private socket: Socket, private http: HttpClient) {
  }

  newMessage(message) {
    this.socket.emit('addMessage', {message});
  }

  deleteMessage(message) {
    this.socket.emit('removeMessage', {message});
  }
}
