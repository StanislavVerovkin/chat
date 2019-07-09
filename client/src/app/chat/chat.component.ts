import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../shared/services/socket.service';
import {MessageModel} from '../models/message.model';
import {UserModel} from '../models/user.model';
import {Subject} from 'rxjs/internal/Subject';
import {JwtHelperService} from '@auth0/angular-jwt';

import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  msgVal = '';
  messages: MessageModel[];

  users: UserModel[];
  uniqueUser: UserModel[];
  userStorage: UserModel;

  startTyping = false;
  partnerIsTyping: { status: boolean, userName: string };

  isLoaded = false;
  isExpiredToken: boolean;

  destroy: Subject<any> = new Subject<any>();

  @ViewChild('inputMessage') input: ElementRef;

  constructor(
    private socketService: SocketService,
  ) {
  }

  @HostListener('window:unload', ['$event'])
  public handleUnload(event) {
    if (this.isExpiredToken) {
      this.logoutUser();
    }
  }

  ngOnInit() {
    this.partnerIsTyping = {status: false, userName: null};

    this.subscribeToTyping();

    this.isLoaded = true;

    this.socketService.getLoggedUsers()
      .subscribe((users) => {
        this.users = users.filter((user) => {
          return user.isLogin;
        });
      });

    this.socketService.getMessages()
      .subscribe((messages: MessageModel[]) => {
        this.messages = messages;
        this.isLoaded = false;
      });

    this.socketService.subscribeToChangeStatusMember()
      .subscribe(res => {
        this.partnerIsTyping = res;
      });
  }

  ngAfterViewInit() {
    this.userStorage = JSON.parse(localStorage.getItem('token'));
    this.isExpiredToken = new JwtHelperService().isTokenExpired(this.userStorage.token);
  }

  chatSend(theirMessage: string) {
    this.getUniqueUser();
    this.uniqueUser.forEach((user) => {
      this.socketService.newMessage(theirMessage, user.name);
      this.isLoaded = true;
      this.msgVal = '';
    });
  }

  logoutUser() {
    this.getUniqueUser();
    this.uniqueUser.forEach((user) => {
      this.socketService.removeLoggedUser(user._id);
      localStorage.removeItem('token');
    });
  }

  removeMessage(id) {
    this.isLoaded = true;
    this.socketService.deleteMessage(id);
  }

  getUniqueUser() {
    this.uniqueUser = this.users.filter((user) => {
      return user.name === this.userStorage.name;
    });
  }

  getColorUser(name) {
    if (name === this.userStorage.name) {
      return '#816A98';
    } else {
      return '#FFF';
    }
  }

  subscribeToTyping() {
    fromEvent(this.input.nativeElement, 'keydown').pipe(
      takeUntil(this.destroy),
      tap(() => {
        if (!this.startTyping) {
          this.socketService.sendStatusIsTyping(true, this.userStorage.name);
          this.startTyping = true;
        }
      }),
      debounceTime(3000),
      tap(() => {
        if (this.startTyping) {
          this.socketService.sendStatusIsTyping(false, this.userStorage.name);
          this.startTyping = false;
        }
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
