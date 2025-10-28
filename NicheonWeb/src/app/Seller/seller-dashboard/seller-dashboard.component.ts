import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
  listings = [
    {
      scrapType: 'Gold Dust',
      weight: '250 grams',
      price: 480000,
      buyers: 4,
      status: 'Active'
    },
    {
      scrapType: 'Broken Chains',
      weight: '120 grams',
      price: 210000,
      buyers: 2,
      status: 'Active'
    },
    {
      scrapType: 'Silver Polishing Residue',
      weight: '1.5 kg',
      price: 65000,
      buyers: 1,
      status: 'Expired'
    }
  ];

  offers = [
    {
      buyer: 'Raj Refiners Pvt Ltd',
      price: 180000,
      duration: '6 months'
    },
    {
      buyer: 'PureGold Recyclers',
      price: 210000,
      duration: '3 months'
    }
  ];

  messages = [
    {
      buyer: 'Anand Metals',
      preview: 'Can you drop a pickup today?'
    },
    {
      buyer: 'Sharma Refinery',
      preview: 'Interested in your Gold Dust listing'
    }
  ];

}
