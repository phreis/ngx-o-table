import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ng-pagination[ngModel]',

  styles: [`
.pagination > .loading > a
 {
  z-index: 3;
  color: #fff;
  cursor: default;
  background-color: #ddd;
  border-color: #337ab7;
}
`],

  template: `
              <ul class="pagination" >
                  <li *ngIf="previousItemValid && firstText" (click)="firstPage()"><a href="#" [innerHTML]="firstText">First</a></li>
                  
                  <li> <a *ngIf="previousItemValid" (click)="previousPage(previousItem)" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li>
                  
                  <li *ngFor="let pageNo of pageList" [ngClass]='getLoadingClass(pageNo)'>
                      <a (click)="setCurrentPage(pageNo)">{{pageNo}}</a>
                  </li>                
                  
                  <li> <a  *ngIf="nextItemValid" (click)="nextPage(nextItem)" aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a> </li>
                  <li><a *ngIf="nextItemValid && lastText" (click)="lastPage()" [innerHTML]="lastText" >Last</a></li>
                </ul>

`
})
export class PaginationDirective implements ControlValueAccessor, OnInit {
  @Input('previous-text') previousText: string;
  @Input('next-text') nextText: string;
  @Input('first-text') firstText: string;
  @Input('last-text') lastText: string;
  @Input("totalItems") totalItems: number;
  @Input("currentPage") cPage: number;
  @Input("maxSize") pageSize: number;
  @Input("itemsPerPage") itemsPerPage: number;
  @Input("boundaryLinks") boundaryLinks: boolean;
  @Output("pageChanged") pageChanged = new EventEmitter();
      ngOnChanges(changes: SimpleChanges) {
        this.totalItems= changes.totalItems.currentValue;
        this.doPaging();
    }
  currentpage: number;
  pageList: Array<number> = [];
  private onChange: Function;
  private onTouched: Function;
  private selectedPage: number;
  private nextItem: number;
  private previousItem: number;
  public nextItemValid: boolean;
  public previousItemValid: boolean;


  private isLoading: boolean;

  constructor(private pageChangedNgModel: NgModel) {
    this.pageChangedNgModel.valueAccessor = this;
  }

  getLoadingClass(pageNo: number): string {
    if (this.selectedPage === pageNo) {
      if (!this.isLoading) {
        return 'active';
      } else {
        return 'loading';
      }

    }
  }
  /*  "{'active':selectedPage === pageNo && !isLoading }"*/

  ngOnInit() {
    this.doPaging();
  }
  doPaging() {
    this.pageList = [];
    var i: number, count: number;
    this.selectedPage = this.currentpage;
    const totalSize = Math.ceil((this.totalItems / this.itemsPerPage));
    for (i = (this.currentpage), count = 0; i <= totalSize && count < this.pageSize; i++ , count++) {
      this.pageList.push(i);
    }
    // next validation
    if (i - 1 < totalSize) {
      this.nextItemValid = true;
      this.nextItem = i;
    } else {
      this.nextItemValid = false;
    }
    // previous validation
    if ((this.currentpage) > 1) {
      this.previousItemValid = true;
      this.previousItem = this.currentpage - this.pageSize;
    } else {
      this.previousItemValid = false;
    }
  }
  setCurrentPage(pageNo: number) {
    this.selectedPage = pageNo;
    this.pageChangedNgModel.viewToModelUpdate(pageNo);
    this.pageChangeListner();
  }
  firstPage() {
    this.currentpage = 1;
    this.pageChangedNgModel.viewToModelUpdate(1);
    this.doPaging();
    this.pageChangeListner();
  }
  lastPage() {
    const lastPage = Math.ceil((this.totalItems / this.itemsPerPage));
    this.currentpage = lastPage;
    this.pageChangedNgModel.viewToModelUpdate(lastPage);
    this.doPaging();
    this.pageChangeListner();

  }
  nextPage(pageNo: number) {
    this.currentpage = pageNo;
    this.pageChangedNgModel.viewToModelUpdate(pageNo);
    this.doPaging();
    this.pageChangeListner();

  }
  previousPage(pageNo: number) {
    //  let temp = pageNo - this.pageSize * 2;
    let temp = this.previousItem;
    this.currentpage = temp > 0 ? temp : 1;
    this.pageChangedNgModel.viewToModelUpdate(this.currentpage);
    this.doPaging();
    this.pageChangeListner();

  }
  writeValue(value: string): void {
    if (!value && value !== '0') return;
    this.setValue(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }
  setValue(currentValue: any) {
    this.currentpage = currentValue;
    this.doPaging();
  }
  pageChangeListner() {
    this.pageChanged.emit({
      itemNumber: this.selectedPage,
      pageNumber: this.currentpage

    });
  }
}