import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sellers',
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css']
})
export class AdminSellersComponent implements OnInit {

  sellers = [
    {
      name: 'Bharat Gems & Jewels',
      email: 'bharat@gmail.com',
      phone: '9876543210',
      status: 'Approved',
      joinedOn: '2024-10-12'
    },
    {
      name: 'Classic Ornaments',
      email: 'classic@gmail.com',
      phone: '9876512340',
      status: 'Pending',
      joinedOn: '2024-12-01'
    }
  ];

  ngOnInit(): void {}
}
