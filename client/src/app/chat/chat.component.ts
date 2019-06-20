import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../shared/services/socket.service';
import {MessageModel} from '../models/message.model';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';
import {debounceTime, take, takeUntil, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {Subject} from 'rxjs/internal/Subject';

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

  startTyping = false;

  destroy: Subject<any> = new Subject<any>();

  @ViewChild('inputMessage') input: ElementRef;

  constructor(
    private socketService: SocketService,
  ) {
  }

  ngOnInit() {
    this.messages = this.socketService.getMessages();
    this.socketService.addOrGetUser('getLoggedUsers')
      .subscribe((data: any[]) => {
        this.users = data;
        this.localStorage = JSON.parse(localStorage.getItem('token'));
      });
  }

  ngAfterViewInit() {
    this.subscribeToTyping();
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

  //
  // typingMessage(status) {
  //
  //   const userName = JSON.parse(localStorage.getItem('token'));
  //
  //   this.sub = this.socketService.typing(status, userName.name)
  //     .pipe(
  //       take(1),
  //       takeUntil(this.destroy),
  //     )
  //     .subscribe((data) => {
  //       this.typing = data;
  //       console.log(this.typing.status);
  //
  //       if (this.typing.status) {
  //         setTimeout(() => {
  //           this.typing.status = false;
  //           console.log(this.typing.status);
  //         }, 5000);
  //       }
  //     });
  // }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  subscribeToTyping() {
    fromEvent(this.input.nativeElement, 'keydown').pipe(
      takeUntil(this.destroy),
      tap(() => {
        if (!this.startTyping) {
          this.typingFunc(true);
        }
      }),
      debounceTime(3000),
      tap(() => {
        if (this.startTyping) {
          this.typingFunc(false);
        }
      }),
    ).subscribe();
  }

  typingFunc(status) {

    const userName = JSON.parse(localStorage.getItem('token'));

    this.socketService.typing(status, userName.name)
      .subscribe((data: any) => {
        this.startTyping = data;
        console.log(this.startTyping.status);
      });
  }
}
