import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomScroll]',
  exportAs: 'appCustomScroll'
})

export class CustomScrollDirective {

  disableBtnLeft: boolean = true;
  disableBtnRight: boolean = false;
  top: any;
  offSetHeight: any;
  scrollHeight: any;

  constructor(private eleRef: ElementRef) { }

  @HostListener('scroll') onScrollEvent(event: Event) {
    this.top = this.eleRef.nativeElement.scrollLeft;
    this.offSetHeight = this.eleRef.nativeElement.offsetWidth;
    this.scrollHeight = this.eleRef.nativeElement.scrollWidth;
    if (this.top === 0) {
      this.disableBtnLeft = true;
    }
    else {
      this.disableBtnLeft = false;
    }
    if (this.top + this.offSetHeight === this.scrollHeight) {
      this.disableBtnRight = true;
    }
    else {
      this.disableBtnRight = false;
    }
  }
}
