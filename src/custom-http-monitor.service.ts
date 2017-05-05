import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class CustomHttpMonitorService {
   public isbusy = false;
   public busyObserver = new Subject<boolean>();
  constructor() { }

public getStatus(): Observable<boolean> {
return Observable.create(function (observer) {
observer.next(this.isbusy);
});
}

public busy() {
this.isbusy = true;
this.busyObserver.next(this.isbusy);
}

public complete() {
this.isbusy = false;
this.busyObserver.next(this.isbusy);
}

}
