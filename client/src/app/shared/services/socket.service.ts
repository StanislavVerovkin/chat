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

  newMessage(message, name) {
    this.socket.emit('addMessage', {message, name});
  }

  getMessages(): Observable<MessageModel[]> {
    this.socket.emit('getMessages');
    return this.socket.fromEvent<MessageModel[]>('messages');
  }

  getMessageById(id): Observable<MessageModel> {
    this.socket.emit('getMessageById', id);
    return this.socket.fromEvent<MessageModel>('message');
  }

  updateMessageById(id, message): Observable<MessageModel> {
    this.socket.emit('updateMessageById', {id: id, message: message});
    return this.socket.fromEvent<MessageModel>('message');
  }

  deleteMessage(id) {
    this.socket.emit('removeMessage', {id});
  }

  getLoggedUsers(): Observable<UserModel[]> {
    this.socket.emit('getUsers');
    return this.socket.fromEvent<UserModel[]>('users');
  }

  changeLoginStatus(id) {
    this.socket.emit('logout', id);
    this.router.navigate(['/login']);
  }

  sendStatusIsTyping(status, userName) {
    return this.socket.emit('typing', {status, userName});
  }

  subscribeToChangeStatusMember(): Observable<{ status: boolean, userName: string }> {
    return this.socket.fromEvent('typingMessage');
  }
}
