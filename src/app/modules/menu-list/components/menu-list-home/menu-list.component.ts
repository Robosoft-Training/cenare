import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, AfterViewInit{
  formType = 'menu';

  constructor(
    private menuListService: MenuListService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  restaurentId: any;

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    this.restaurentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.menuListService.getRestaurantMenuItems(this.restaurentId).subscribe(
      (data: any) => {
      }
    );
  }

  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }

}
