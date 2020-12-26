import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

    let resultList = [
      {
        "menu": {
          "menu_id": 89,
          "item_name": "Red Rice",
          "cook_time": 10.0,
          "category": "vegetarian",
          "course": "desert",
          "desrcription": "Red rice is a variety of rice that is colored red by its anthocyanin content",
          "item_image_path": "https://mega-project-test.s3.ap-south-1.amazonaws.com/red+rice.jpg"
        },
        "price": 120.0
      },
      {
        "menu": {
          "menu_id": 88,
          "item_name": "Brown Rice",
          "cook_time": 25.0,
          "category": "vegetarian",
          "course": "soup",
          "desrcription": "Brown rice is a whole grain. That means it contains all parts of the grain — including the fibrous bran, the nutritious germ and the carb-rich",
          "item_image_path": "https://mega-project-test.s3.ap-south-1.amazonaws.com/Brown+rice.jpg"
        },
        "price": 100.0
      },
      {
        "menu": {
          "menu_id": 88,
          "item_name": "Brown Rice",
          "cook_time": 25.0,
          "category": "vegetarian",
          "course": "main",
          "desrcription": "Brown rice is a whole grain. That means it contains all parts of the grain — including the fibrous bran, the nutritious germ and the carb-rich",
          "item_image_path": "https://mega-project-test.s3.ap-south-1.amazonaws.com/Brown+rice.jpg"
        },
        "price": 100.0
      }
    ];

    let newArray = {};
    for (var i of resultList) {
      if (!(newArray[i.menu.course])) {
        newArray[i.menu.course] = []
      }
      newArray[i.menu.course].push(i);
      console.log(newArray);
    }
  }
}
