import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  template:
  `
  <ngx-o-table
    [entitySetName]="'Products'" 
    [serviceUrl]="'/V3/Northwind/Northwind.svc/'" >
  </ngx-o-table> 
  `,
})
export class ProductListComponent { }