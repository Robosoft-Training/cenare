import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ConnectionComponent } from 'src/app/components/shared-components/empty-scenario/connection/connection.component';
import { NetworkStstusService } from 'src/app/services/network-service/network-ststus.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { CartService } from 'src/app/services/order-details/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  componentName = 'cart-list';
  constructor(
    private networkStstusService: NetworkStstusService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private userProfileService: UserProfileService,
    private cartService: CartService
  ) { }
  
  orders = [{
    "orderNumber": 0,
    "restaurant_name": "",
    "restaurant_address": "",
    "numOFItems": 0,
    "totalAmount": 0
  }];
  
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  showCartItems = () => {
    // Update cart items
    this.componentName = 'cart-items';
  }

  loadData = () => {
    this.userProfileService.getUserOrders().subscribe(
      (data :any) => {
        this.orders = data.resultList;
      }
    )
  }

  clearCart = (orderNumber) => {
    this.cartService.clearCart(orderNumber).subscribe(
      msg => {
        this.loadData();
      }
    );
  }

  ngOnInit(): void {
    let isOnlineOfline = this.networkStstusService.getNetworkStatus();
    if (!isOnlineOfline){
      const dialogRef = this.dialog.open(ConnectionComponent, { panelClass: 'connection' });
      dialogRef.afterClosed().subscribe(result => {});
    }
    else {
      this.loadData();
    }
  }
}
