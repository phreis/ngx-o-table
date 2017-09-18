
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { GenericListComponent } from 'ngx-o-table';

@Component({
    selector: 'app-dsrc1',
    templateUrl: './dsrc1.component.html',
    styleUrls: ['./dsrc1.component.css']
})
export class Dsrc1Component implements OnInit, AfterViewInit {
    entitySets: Object[];
    selectedSetName: String;
    @ViewChild(GenericListComponent)
    private productsList: GenericListComponent;
    ngAfterViewInit() {
        this.productsList.getColumns().subscribe(columns => {
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
            this.productsList.updateColumns(columns);
        })


    }
    ngOnInit() {

    }
    onSelectSet(set: Object) {
        this.selectedSetName = set['$']['Name'];
    }
    serviceUrl = `/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/`;
//   serviceUrl = `/V3/Northwind/Northwind.svc/`;

}

