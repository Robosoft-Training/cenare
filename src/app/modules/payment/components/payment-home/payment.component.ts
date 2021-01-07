import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  componentName = 'cart-list';
  constructor( private elementRef: ElementRef, private userProfileService: UserProfileService) { }
  orders = [{
    "orderNumber": 0,
    "restaurant_name": "",
    "restaurant_address": "",
    "numOFItems": 0,
    "totalAmount": 0
  }];
  ngOnInit(): void {
    this.userProfileService.getUserOrders().subscribe(
      (data :any) => {
        this.orders = data.resultList;
      }
    )
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  showCartItems = () => {
    // Update cart items
    this.componentName = 'cart-items';
  }
}
