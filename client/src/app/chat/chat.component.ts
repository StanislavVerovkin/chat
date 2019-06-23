import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../shared/services/socket.service';
import {MessageModel} from '../models/message.model';
import {UserModel} from '../models/user.model';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  msgVal = '';
  messages: MessageModel[];

  users: UserModel[];
  uniqueUser: UserModel[];
  localStorage: UserModel;

  startTyping = false;
  partnerIsTyping: { status: boolean, userName: string };

  isLoaded = false;

  destroy: Subject<any> = new Subject<any>();

  @ViewChild('inputMessage') input: ElementRef;

  constructor(
    private socketService: SocketService,
  ) {
  }

  ngOnInit() {

    this.partnerIsTyping = {status: false, userName: null};
    this.subscribeToTyping();

    this.isLoaded = true;

    this.socketService.getMessages()
      .subscribe((data: MessageModel[]) => {
        this.messages = data;
        this.isLoaded = false;
      });

    this.socketService.addOrGetUser('getLoggedUsers')
      .subscribe((data: any[]) => {
        this.users = data;
        this.localStorage = JSON.parse(localStorage.getItem('token'));
      });

    this.socketService.subscribeToChangeStatusMember()
      .subscribe(res => {
        this.partnerIsTyping = res;
      });
  }

  chatSend(theirMessage: string) {

    this.getUniqueUser();

    this.uniqueUser.forEach((element) => {
      this.socketService.newMessage(theirMessage, element.name);
      this.isLoaded = true;
      this.msgVal = '';
    });
  }

  logoutUser() {

    this.getUniqueUser();

    this.uniqueUser.forEach((element) => {
      this.socketService.removeLoggedUser(element._id);
      localStorage.removeItem('token');
    });
  }

  removeMessage(id) {
    this.isLoaded = true;
    this.socketService.deleteMessage(id);
  }

  getUniqueUser() {
    this.uniqueUser = this.users.filter((element) => {
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

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  subscribeToTyping() {
    fromEvent(this.input.nativeElement, 'keydown').pipe(
      takeUntil(this.destroy),
      tap(() => {
        if (!this.startTyping) {
          this.socketService.sendStatusIsTyping(true, this.localStorage.name);
          this.startTyping = true;
        }
      }),
      debounceTime(3000),
      tap(() => {
        if (this.startTyping) {
          this.socketService.sendStatusIsTyping(false, this.localStorage.name);
          this.startTyping = false;
        }
      }),
    ).subscribe();
  }
}
