import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{

  @Input() latitude;//عرض داداش
  @Input() longitude;//طول داداش



 ngAfterViewInit() {
    const map = L.map('map').setView([35.6892, 51.3890], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([this.latitude, this.longitude]).addTo(map)
      .bindPopup('مکان ناناسی تو')
      .openPopup();
   }
}
