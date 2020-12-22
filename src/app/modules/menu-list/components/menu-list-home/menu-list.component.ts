import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  formType: any;
  constructor() { }

  ngOnInit(): void {
  }
  showFormType(formName): void {
    this.formType = formName;
  }

}
