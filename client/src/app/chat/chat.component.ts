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
      });
  }

  chatSend(theirMessage: string) {
    this.getUniqueUser();

    this.uniqUser.forEach((element) => {
      this.socketService.newMessage(theirMessage, element.name);
      this.msgVal = '';
    });
  }

  logoutUser() {

    this.getUniqueUser();

    this.uniqUser.forEach((element) => {
      this.socketService.removeLoggedUser(element._id);
    });
  }

  getUniqueUser() {
    const token = JSON.parse(localStorage.getItem('token'));

    this.uniqUser = this.users.filter((element) => {
      return element.token === token;
    });
  }

  removeMessage(id) {
    this.socketService.deleteMessage(id);
  }
}
