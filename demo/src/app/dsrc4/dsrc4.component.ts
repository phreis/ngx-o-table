
import { Component, OnInit } from '@angular/core';
import { GenericListComponent } from 'ngx-o-table';
import { ViewChild } from '@angular/core';
import { OService } from 'o-serv';
@Component({
  selector: 'app-dsrc4',
  templateUrl: './dsrc4.component.html',
  styleUrls: ['./dsrc4.component.css']
})
export class Dsrc4Component implements OnInit  {
    entitySets: Object[];
    selectedSetName: string;
    serviceUrl: string = `/V3/Northwind/Northwind.svc/`;
    @ViewChild(GenericListComponent)
    private genericList: GenericListComponent;
  constructor() { 

  }

  ngOnInit() {
    OService.getInstance(this.serviceUrl)
    .getEntitySets()
    .subscribe(sets => { this.entitySets = sets; });
  }
    onSelectSet(set: Object) {
        this.genericList.updateEntitySetName(set['$']['Name']);
    }
}

