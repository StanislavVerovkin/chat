import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {MessageModel} from '../../models/message.model';
import {UserModel} from '../../models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private router: Router
  ) {
  }

  newMessage(message) {
    this.socket.emit('addMessage', {message});
  }

  getMessages(): Observable<MessageModel[]> {
    this.socket.emit('getMessages');
    return this.socket.fromEvent<MessageModel[]>('messages');
  }

  deleteMessage(id) {
    this.socket.emit('removeMessage', {id});
  }

  addOrGetUser(eventName, data?): Observable<UserModel[]> {
    this.socket.emit(eventName, data);
    return this.socket.fromEvent<UserModel[]>('users');
  }

  removeLoggedUser(id) {
    this.socket.emit('changeStatusLogin', id);
    this.router.navigate(['/login']);
  }
}
