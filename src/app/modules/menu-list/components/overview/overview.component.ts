import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "../assets/images/location.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
    }
    
  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      controls: [] ,
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
