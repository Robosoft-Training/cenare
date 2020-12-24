import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  formType = 'menu';
  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }
  ngOnInit(): void {
  }

  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }

}
