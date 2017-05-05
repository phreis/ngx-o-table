import { CustomHttpMonitorService } from './../custom-http-monitor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-http-monitor',
  templateUrl: './custom-http-monitor.component.html',
  styleUrls: ['./custom-http-monitor.component.css'],

})
export class CustomHttpMonitor implements OnInit {
public busy:boolean;

  constructor(private monitorService: CustomHttpMonitorService) { 

  }

  ngOnInit() {
    this.monitorService.busyObserver.subscribe((status) =>{ this.busy = status })  
}

}
