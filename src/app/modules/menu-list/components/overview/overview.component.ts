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
  description: any = '';
  cuisines: any = [];
  phone: any = '';
  map: any;
  address: any = '';
  cost: any = '';
  openTime: any = [];
  closeTime: any = [];

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

  ngOnInit() {
    this.restaurantOverview.currentoverviewDataListSource.subscribe(
      (dataList: any) => {
        this.description = dataList.restaurant_description;
        this.cuisines = dataList.cuisines;
        this.phone = dataList.phone;
        this.address = dataList.restaurant_address;
        this.cost = dataList.min_order_cost;
        this.openTime = dataList.open_time;
        this.closeTime = dataList.close_time;
        this.longitude = dataList.latitude;
        this.latitude = dataList.longitude;
      }
    );

    this.map = new ol.Map({
      target: 'map',
      controls: [],
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.latitude, this.longitude]),
        zoom: 13
      })
    });
    this.addPoint(this.longitude, this.latitude);
  }

}
