import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {SocketService} from '../shared/services/socket.service';
import {MessageModel} from '../models/message.model';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';
import {typeIsOrHasBaseType} from 'tslint/lib/language/typeUtils';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  msgVal = '';
  messages: Observable<MessageModel[]>;
  users: UserModel[];
  uniqUser = [];
  localStorage: UserModel;
  typing;

  sub: Subscription;

  constructor(
    private socketService: SocketService,
  ) {
  }

  ngOnInit() {
    this.typingMessage(false);
    this.messages = this.socketService.getMessages();
    this.socketService.addOrGetUser('getLoggedUsers')
      .subscribe((data: any[]) => {
        this.users = data;
        this.localStorage = JSON.parse(localStorage.getItem('token'));
      });
  }

  ngAfterViewInit() {
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
      localStorage.removeItem('token');
    });
  }

  removeMessage(id) {
    this.socketService.deleteMessage(id);
  }

  getUniqueUser() {
    this.uniqUser = this.users.filter((element) => {
      return element.token === this.localStorage.token;
    });
  }

  getColorUser(authToken) {
    if (authToken === this.localStorage.token) {
      return '#816A98';
    } else {
      return 'gainsboro';
    }
  }

  typingMessage(status) {
    const userName = JSON.parse(localStorage.getItem('token'));

    this.sub = this.socketService.typing(status, userName.name)
      .subscribe((data) => {
        this.typing = data;
      });
    setTimeout(() => {
      this.typing = false;
    }, 5000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
