import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

    showBuyerPopup: boolean = false;

  features = [
    { icon: 'bi bi-patch-check-fill', label: 'Verified Businesses' },
    { icon: 'bi bi-lightning-charge-fill', label: 'Instant Connections' },
    { icon: 'bi bi-lock-fill', label: 'Secure & Transparent' },
    { icon: 'bi bi-graph-up-arrow', label: 'Grow Your Business' },
  ];

    navigate(role: string) {
      debugger;
    if (role === 'seller') {
      localStorage.setItem('selectedRole', role);
      this.router.navigate(['/auth/login'], { queryParams: { role } });
      return;
    }

    if (role === 'buyer') {
      this.openBuyerApp();
      return;
    }
  }

  openBuyerApp() {
    this.showBuyerPopup = true;
  }

  closeBuyerApp() {
    this.showBuyerPopup = false;
  }


// showBuyerAppPopup() {
//   const popup = window.open("", "buyerAppPopup", "width=360,height=480");

//   popup!.document.write(`
//     <html>
//       <head>
//         <title>Buyer App</title>
//         <style>
//           body { 
//             font-family: Arial; 
//             text-align: center; 
//             padding-top: 20px;
//           }
//           img {
//             width: 230px;
//             margin-top: 10px;
//           }
//           button {
//             margin-top: 18px;
//             padding: 10px 18px;
//             background: #0D6EFD;
//             border: none;
//             color: white;
//             font-size: 16px;
//             border-radius: 6px;
//             cursor: pointer;
//           }
//         </style>
//       </head>
//       <body>
//         <h3>Buyer App</h3>
//         <p>Scan the QR code to download the app</p>
//         <img src="assets/Image/barcode_buyer.png" />

//         <p style="margin-top: 14px; font-weight: bold;">COMING SOON ON PLAY STORE</p>

//         <button onclick="window.close()">Close</button>
//       </body>
//     </html>
//   `);
// }

}
