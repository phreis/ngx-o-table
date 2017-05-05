import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drc3Component } from './dsrc3.component';

describe('Drc3Component', () => {
  let component: Drc3Component;
  let fixture: ComponentFixture<Drc3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drc3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
