import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() chat: any;
  @Output() back = new EventEmitter<void>();

  goBack() {
    this.back.emit();
  }

scrap = {
    image: 'https://via.placeholder.com/40',
    title: 'Gold Dust – 50g',
  };

  opponent = {
    businessName: 'Star Jewels',
    verified: true,
  };

  messages = [
    {
      isMine: false,
      type: 'text',
      text: 'Hello, I am interested in your listing.',
      timestamp: '10:30 AM',
      read: true,
    },
    {
      isMine: true,
      type: 'text',
      text: 'Thanks! Are you looking for a one-time deal or monthly?',
      timestamp: '10:32 AM',
      read: true,
    },
    {
      isMine: false,
      type: 'image',
      imageUrl: 'https://via.placeholder.com/100',
      timestamp: '10:34 AM',
      read: true,
    },
    {
      isMine: true,
      type: 'offer',
      amount: 22000,
      timestamp: '10:36 AM',
      read: false,
    },
  ];

  systemMessages = [
    'You marked this listing as Sold',
    'This seller accepted your ₹22,000 monthly offer'
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        isMine: true,
        type: 'text',
        text: this.newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      });
      this.newMessage = '';
    }
  }

}
