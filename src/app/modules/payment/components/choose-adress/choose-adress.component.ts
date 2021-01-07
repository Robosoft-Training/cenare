import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-adress',
  templateUrl: './choose-adress.component.html',
  styleUrls: ['./choose-adress.component.scss']
})
export class ChooseAdressComponent implements OnInit {

  name: string = "";
  phoneNumber: any = "";
  nameError = false;
  phoneNumberError = false;
  flagImageUrl = "assets/images/country-flag/india.png";
  flagImageUrlArray = [
    {
      "code":"+91",
      "url":"assets/images/country-flag/india.png"
    },
    {
      "code":"+1",
      "url":"assets/images/country-flag/united-kingdom.png"
    },
    {
      "code":"+44",
      "url":"assets/images/country-flag/united-states.png"
    }
  ]
  constructor() { }
  
  ngOnInit(): void {}

  check(){
    if (this.name.length === 0) {
      this.nameError = true;
    }
    else if (this.phoneNumber.toString().length !== 10) {
      this.nameError = false;
      this.phoneNumberError = true;
    }
  }
  setCountryFlag(code:any){
    console.log(code);
    
  }
}
