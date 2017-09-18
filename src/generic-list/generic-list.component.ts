import { FieldcatalogFormatFunctions } from './../fieldcatalog.format.functions';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, Input, Output, Injectable, HostBinding, SimpleChanges } from '@angular/core';


import { FieldCatalogField } from '../fieldcatalog.field';
import { Fieldcatalog } from '../fieldcatalog';
import { Observable } from 'rxjs/Observable';

import { OService, OModel, OHeader } from 'o-serv';
@Component({
    selector: 'ngx-o-table',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.css'],

})

export class GenericListComponent implements OnInit {
    //  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() entitySetName: string;
    @Input() serviceUrl: string;
    @Input() itemsPerPage: number;
    @Input() maxPagesInPagination: number;


    entities: Object;
    columns: FieldCatalogField[];
    selectedEntity: Object;
    private fieldcatalog: Fieldcatalog;


    public currentPage: number;
    public totalItems: number;

    is_init: boolean = true;
    serv: OService;
    model: OModel;

    constructor() {
        if (!this.itemsPerPage) { this.itemsPerPage = 5 };
        if (!this.maxPagesInPagination) { this.maxPagesInPagination = 3 };

    }

    ngOnInit(): void {
        this.init();
    }

    private init() {
        this.entities = null;
        this.currentPage = 1;


        this.serv = OService.getInstance(this.serviceUrl);
        this.model = this.serv.getModel(this.entitySetName);
        if (this.entitySetName) {
            this.getColumns().subscribe(columns => {
                this.columns = columns;
                this.model.count().subscribe(cnt => {
                    this.totalItems = Number(cnt);
                    this.model.getEntitySkipTop('0', this.itemsPerPage.toString())
                    .subscribe(entities => { this.entities = entities; this.is_init = false; });
                })
            });
        }
    };

    private _mergeWithFieldcatalog(meta: Object) {
       return new Fieldcatalog(meta).getFields();

}

    getColumns(){
        return this.model.getMetadata()
            .map(this._mergeWithFieldcatalog)
    };

    getSetsAll() {
        return this.serv.getEntitySets();
    }

    updateColumns(columns: FieldCatalogField[]) {
        this.columns = columns;
    };

    onSelect(entity: Object) {
        this.selectedEntity = entity;
    }


    public setPage(pageNo: number): void {
        this.currentPage = pageNo;
    };

    public pageChanged(event: any): void {
        this.model.getEntitySkipTop(((event.itemNumber - 1) * this.itemsPerPage).toString(), this.itemsPerPage.toString()).subscribe(entities => { this.entities = entities; });
    };
    public updateEntitySetName(entitySetName: string) {
        this.entitySetName = entitySetName;
        this.init();
    };
};




