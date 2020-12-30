import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';

declare var ol: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private restaurantOverview: RestaurantOverviewService) { }
  
  latitude: number = 18.5204;
  longitude: number = 73.8567;
  description: any ='';
  cuisines: any=[];
  phone: any='';
  map: any;
  address:any='';
  cost:any='';
  openTime:any=[];
  closeTime:any=[];

  addPoint(lat: number, lng: number) {
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: '../assets/images/location.png'
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

  ngOnInit()
   {
     this.restaurantOverview.currentoverviewDataListSource.subscribe(
       (data:any)=> {console.log(data)
      this.description=data.restaurant_description
      this.cuisines=data.cuisines
      this.phone=data.phone
      this.address=data.restaurant_address
      this.cost=data.min_order_cost
      this.openTime=data.open_time
      this.closeTime=data.close_time
      }

     )
     
    this.map = new ol.Map({
      target: 'map',
      controls: [],
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([74.8560, 12.9141]),
        zoom: 13
      })
    });
    this.addPoint(12.9141, 74.8560);
  }
  
}
