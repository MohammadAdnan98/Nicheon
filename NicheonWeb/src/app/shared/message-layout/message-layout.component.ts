import { Component } from '@angular/core';

@Component({
  selector: 'app-message-layout',
  templateUrl: './message-layout.component.html',
  styleUrls: ['./message-layout.component.css']
})
export class MessageLayoutComponent {
 selectedChat: any = null;

  chats = [
    {
      name: 'GoldMart Traders',
      lastMessage: 'Thanks for your offer, we’ll check...',
      time: '10:30 AM',
      image: ''
    },
    {
      name: 'Urban Silver Works',
      lastMessage: 'Contract terms look fine. Proceed?',
      time: '09:45 AM',
      image: ''
    },
    {
      name: 'Spark Metal Recyclers',
      lastMessage: 'Hi, is it still available?',
      time: 'Yesterday',
      image: ''
    }
  ];
  back: any;

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  clearChat() {
    this.selectedChat = null;
  }
  goBack() {
    this.back.emit();
  }
}
