import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent {
  scrapListings = [
    {
      image: 'assets/Image/LumaJewalLogo.png',
      scrapType: 'Gold Dust',
      weight: '120g',
      location: 'Mumbai'
    },
    {
      image: 'assets/Image/LumaJewalLogo.png',
      scrapType: 'Polishing Residue',
      weight: '300g',
      location: 'Surat'
    },
    {
      image: 'assets/Image/LumaJewalLogo.png',
      scrapType: 'Mixed Metal Scrap',
      weight: '250g',
      location: 'Delhi'
    }
  ];

  contractLeads = [
    {
      sellerName: 'Kumar Jewellers',
      location: 'Jaipur',
      volume: '500g/month',
      duration: '6 months',
      price: 5050
    },
    {
      sellerName: 'Bombay Gold Works',
      location: 'Mumbai',
      volume: '300g/month',
      duration: '3 months',
      price: 4980
    }
  ];

  savedListings = [
    {
      scrapType: 'Gold Dust',
      weight: '200g'
    },
    {
      scrapType: 'Silver Chips',
      weight: '150g'
    }
  ];
}
