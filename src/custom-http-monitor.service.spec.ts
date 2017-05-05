/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomHttpMonitorService } from './custom-http-monitor.service';

describe('CustomHttpMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHttpMonitorService]
    });
  });

  it('should ...', inject([CustomHttpMonitorService], (service: CustomHttpMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
