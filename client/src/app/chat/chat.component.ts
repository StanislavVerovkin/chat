import {Component, OnInit} from '@angular/core';
import {SocketService} from '../shared/services/socket.service';
import {MessageModel} from '../models/message.model';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  msgVal = '';
  messages: Observable<MessageModel[]>;
  users: UserModel[];
  uniqUser = [];

  constructor(
    private socketService: SocketService,
  ) {
  }

  ngOnInit() {
    this.messages = this.socketService.getMessages();
    this.socketService.addOrGetUser('getLoggedUsers')
      .subscribe((data: any) => {
        this.users = data;
        console.log(this.users);
      });
  }

  chatSend(theirMessage: string) {
    this.socketService.newMessage(theirMessage);
    this.msgVal = '';
  }

  logoutUser() {

    const token = JSON.parse(localStorage.getItem('token'));

    this.uniqUser = this.users.filter((element) => {
      return element.token === token;
    });

    this.uniqUser.forEach((element) => {
      this.socketService.removeLoggedUser(element._id);
      localStorage.removeItem('token');
    });
  }

  removeMessage(id) {
    this.socketService.deleteMessage(id);
  }
}
