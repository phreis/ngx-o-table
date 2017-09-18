
import { Component, OnInit } from '@angular/core';
import { GenericListComponent } from 'ngx-o-table';
import { ViewChild } from '@angular/core';
import { OService } from 'o-serv';
@Component({
  selector: 'app-dsrc5-cds',
  templateUrl: './dsrc5-cds.component.html',
  styleUrls: ['./dsrc5-cds.component.css']
})
export class Dsrc5CdsComponent implements OnInit  {
    entitySets: Object[];
    selectedSetName: string;
    serviceUrl: string = `/sap/opu/odata/sap/ZZ_CDS_TEST_CDS/`;
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

