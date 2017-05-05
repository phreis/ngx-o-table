import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dsrc4Component } from './dsrc4.component';

describe('Dsrc4Component', () => {
  let component: Dsrc4Component;
  let fixture: ComponentFixture<Dsrc4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dsrc4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dsrc4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
