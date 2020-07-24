import { Component, OnInit } from '@angular/core';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.css']
})
export class TransportsComponent implements OnInit {

  constructor(
    private transportService: TransportService
  ) {
    
   }

  ngOnInit() {
  }

}