import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  componentName = 'cart-list';
  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  showCartItems = () => {
    // Update cart items
    this.componentName = 'cart-items';
  }

  ngOnInit(): void {
  }

}
