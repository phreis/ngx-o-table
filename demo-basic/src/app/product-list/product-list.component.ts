import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  template:
  `
  <ngx-o-table
    [entitySetName]="'BusinessPartnerSet'" 
    [serviceUrl]="'/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/'" >
  </ngx-o-table> 
  `,
})
export class ProductListComponent { }