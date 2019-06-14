import {Component, OnInit} from '@angular/core';
import {DocumentService} from './document.service';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  msgVal = '';
  messages: Observable<string[]>;

  constructor(
    private documentService: DocumentService,
  ) {
  }

  ngOnInit() {
    this.messages = this.documentService.messages;
  }

  chatSend(theirMessage: string) {
    this.documentService.newMessage(theirMessage);
    this.msgVal = '';
  }
}
