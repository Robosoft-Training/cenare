import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  avatarImageLinks = [
    "../../../../../assets/images/avatar/icn_icecream.png",
    "../../../../../assets/images/avatar/icn_cupcake.png",
    "../../../../../assets/images/avatar/icn_frenchfries.png",
    "../../../../../assets/images/avatar/icn_burger.png",
    "../../../../../assets/images/avatar/icn_chicken.png",
    "../../../../../assets/images/avatar/icn_bread.png",
    "../../../../../assets/images/avatar/icn_donut.png",
    "../../../../../assets/images/avatar/icn_beer.png",
    "../../../../../assets/images/avatar/icn_pizza.png"];

  constructor(private elementRef: ElementRef,) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }


  ngOnInit(): void {
  }

}
