import { FieldcatalogFormatFunctions } from './../fieldcatalog.format.functions';
import { EntityService } from './../entity.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, Input, Output, Injectable, HostBinding, SimpleChanges } from '@angular/core';
import { MetadataService } from '../metadata.service'

import { FieldCatalogField } from '../fieldcatalog.field';
import { Fieldcatalog } from '../fieldcatalog';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
    selector: 'ngx-o-table',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.css'],
    providers: [EntityService, MetadataService]
})

export class GenericListComponent implements OnInit {
    //  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() entitySetName: string;
    @Input() serviceUrl: string;
    @Input() itemsPerPage: number;
    @Input() maxPagesInPagination: number;

    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([]);
    //get data(): Object[] { return this.dataChange.value; }

    dataSource: EntityDataSource | null;
    displayedColumns: String[];


    entities: Object[];
    columns: FieldCatalogField[];
    selectedEntity: Object;
    private fieldcatalog: Fieldcatalog;


    public currentPage;
    public totalItems;

    is_init: boolean = true;


    constructor(public EntityService: EntityService, public mtsrv: MetadataService) {
        if (!this.itemsPerPage) { this.itemsPerPage = 5 };
        if (!this.maxPagesInPagination) { this.maxPagesInPagination = 3 };
    }

    ngOnInit(): void {
        this.init();
    }



    private init() {
        this.entities = null;
        this.currentPage = 1;
        this.EntityService.setServiceUrl(this.serviceUrl);
        this.mtsrv.setServiceUrl(this.serviceUrl);
        if (this.entitySetName) {
            this.getColumns().subscribe(columns => {
                this.columns = columns;
                this.displayedColumns = this.getDisplayedColumnsNames();
                this.EntityService.getEntityCount(this.entitySetName).subscribe(cnt => {
                    this.totalItems = cnt;
                    this.EntityService.getEntitySkipTop(this.entitySetName, '0', this.itemsPerPage.toString()).subscribe(entities => { this.entities = entities; this.is_init = false; this.dataChange.next(entities); });
                    this.dataSource = new EntityDataSource(this.dataChange);
                })
            });
        }
    };

    private mergeWithFieldcatalog(f: Object) {
        return new Fieldcatalog(f).getFields();
    }

    getColumns(): Observable<FieldCatalogField[]> {
        return this.mtsrv.getMetadataProperties(this.entitySetName)
            .map(this.mergeWithFieldcatalog)
    };

    private getDisplayedColumnsNames(): String[] {
        let _displayedColumns: String[] = [];

        for (let column of this.columns) {
            if (!(column.display == 'none')) {
                _displayedColumns.push(column.fieldname);
            }
        }
        return _displayedColumns;
    }

    getSetsAll(): Observable<Object[]> {
        return this.mtsrv.getEntitySets();
    }

    updateColumns(columns: FieldCatalogField[]) {
        this.columns = columns;
        this.displayedColumns = this.getDisplayedColumnsNames();
    };

    onSelect(entity: Object) {
        this.selectedEntity = entity;
    }


    public setPage(pageNo: number): void {
        this.currentPage = pageNo;
    };

    public pageChanged(event: any): void {
        this.EntityService.getEntitySkipTop(this.entitySetName, ((event.itemNumber - 1) * this.itemsPerPage).toString(), this.itemsPerPage.toString()).subscribe(entities => { this.entities = entities; this.dataChange.next(entities); });
    };
    public updateEntitySetName(entitySetName: string) {
        this.entitySetName = entitySetName;
        this.init();
    };
};

export class EntityDataSource extends DataSource<any> {
    constructor(private _source: Observable<Object[]>) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Object[]> {
        return this._source;
    }

    disconnect() { }
}




