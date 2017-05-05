
import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'ngx-o-table';
import { GenericListComponent } from 'ngx-o-table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-dsrc4',
  templateUrl: './dsrc4.component.html',
  styleUrls: ['./dsrc4.component.css'],
  providers: [ MetadataService ]
})
export class Dsrc4Component implements OnInit  {
    entitySets: Object[];
    selectedSetName: string;
    serviceUrl: string = `/V3/Northwind/Northwind.svc/`;
    @ViewChild(GenericListComponent)
    private genericList: GenericListComponent;
  constructor(private mtsrv: MetadataService) { 

  }

  ngOnInit() {
    this.mtsrv.setServiceUrl(this.serviceUrl);
    this.mtsrv.getEntitySets().subscribe(sets=>{this.entitySets = sets; });
  }
    onSelectSet(set: Object) {
        this.genericList.updateEntitySetName(set['$']['Name']);
    }
}

