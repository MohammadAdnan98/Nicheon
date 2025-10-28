import { Component } from '@angular/core';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent 
{

  listings = [
    {
      image: 'assets/Image/gold-dust.jpg',
      scrapType: 'Gold Dust',
      weight: '200g',
      price: 52000,
      location: 'Mumbai',
      status: 'Active',
      buyers: 3
    },
    {
      image: 'assets/Image/silver-polish.jpg',
      scrapType: 'Silver Polish',
      weight: '1.2kg',
      price: 18000,
      location: 'Delhi',
      status: 'Sold',
      buyers: 5
    },
    {
      image: 'assets/Image/broken-jewelry.jpg',
      scrapType: 'Broken Chains',
      weight: '500g',
      price: 40000,
      location: 'Surat',
      status: 'Expired',
      buyers: 1
    },
    {
      image: 'assets/Image/gold-scrap.jpg',
      scrapType: 'Gold Filing Residue',
      weight: '150g',
      price: 36000,
      location: 'Jaipur',
      status: 'Active',
      buyers: 4
    },
    {
      image: 'assets/Image/silver-dust.jpg',
      scrapType: 'Silver Dust',
      weight: '750g',
      price: 12000,
      location: 'Hyderabad',
      status: 'Sold',
      buyers: 2
    }
  ];

}
