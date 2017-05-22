import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dsrc5CdsComponent } from './dsrc5-cds.component';

describe('Dsrc5CdsComponent', () => {
  let component: Dsrc5CdsComponent;
  let fixture: ComponentFixture<Dsrc5CdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dsrc5CdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dsrc5CdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
