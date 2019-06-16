import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {MessageModel} from './models/message.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  messages: Observable<MessageModel[]>;

  constructor(private socket: Socket, private http: HttpClient) {
  }

  newMessage(message) {
    this.socket.emit('addMessage', {message});
  }

  getMessages(): Observable<MessageModel[]> {
    this.socket.emit('getMessages');
    return this.messages = this.socket.fromEvent<MessageModel[]>('messages');
  }

  deleteMessage(id) {
    this.socket.emit('removeMessage', {id});
  }
}
