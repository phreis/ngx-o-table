import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dsrc2Component } from './dsrc2.component';

describe('Dsrc2Component', () => {
  let component: Dsrc2Component;
  let fixture: ComponentFixture<Dsrc2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dsrc2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dsrc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
