import { CustomHttpMonitorService } from './../custom-http-monitor.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomHttpMonitorComponent } from './custom-http-monitor.component';

describe('CustomHttpMonitorComponent', () => {
  let component: CustomHttpMonitorComponent;
  let fixture: ComponentFixture<CustomHttpMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomHttpMonitorComponent ],
      providers: [ CustomHttpMonitorService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHttpMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
