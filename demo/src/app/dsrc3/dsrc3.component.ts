
import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'ngx-o-table';
import { GenericListComponent } from 'ngx-o-table';
import { AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dsrc3',
  templateUrl: './dsrc3.component.html',
  styleUrls: ['./dsrc3.component.css'],
  providers: [ MetadataService ]
})
export class Dsrc3Component implements OnInit  {
    entitySets: Object[];
    selectedSetName: string;
    serviceUrl: string = `/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/`;
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
        this.customizeColumns();

    }
    private customizeColumns() {
        this.genericList.getColumns().subscribe(columns => {
            for (let field of columns) {
                switch (field.fieldname) {
                    case 'Address':
                        field.display = 'none'
                        break;
                    case 'BusinessPartnerID':
                        field.formatfunction = 'leading_zero_delete';
                        break;
                    case 'CreatedAt':
                        field.formatfunction = 'timestamp_to_time';
                        field.coltext = 'angelegt am';
                        break;
                    case 'ChangedAt':
                        field.formatfunction = 'timestamp_to_time';
                        field.coltext = 'geändert am';
                        break;
                }
            }
            this.genericList.updateColumns(columns);
        })


    }
}
