
import { Component, OnInit } from '@angular/core';
import { GenericListComponent } from 'ngx-o-table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { OService } from 'o-serv';
@Component({
    selector: 'app-dsrc3',
    templateUrl: './dsrc3.component.html',
    styleUrls: ['./dsrc3.component.css']
})
export class Dsrc3Component implements OnInit {
    entitySets: Object[];
    selectedSetName: string;
    serviceUrl: string = `/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/`;
    srv: OService;
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
