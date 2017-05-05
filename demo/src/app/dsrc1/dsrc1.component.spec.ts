import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dsrc1Component } from './dsrc1.component';

describe('Dsrc1Component', () => {
  let component: Dsrc1Component;
  let fixture: ComponentFixture<Dsrc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dsrc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dsrc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
