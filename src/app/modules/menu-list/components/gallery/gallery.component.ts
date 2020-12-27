import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;


  displayImage1() {
    this.isOpen1 = !this.isOpen1;
  }

  close1() {
    this.isOpen1 = !this.isOpen1;
  }

  displayImage2() {
    this.isOpen2 = !this.isOpen2;
  }

  close2() {
    this.isOpen2 = !this.isOpen2;
  }

  displayImage3() {
    this.isOpen3 = !this.isOpen3;
  }

  close3() {
    this.isOpen3 = !this.isOpen3;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
