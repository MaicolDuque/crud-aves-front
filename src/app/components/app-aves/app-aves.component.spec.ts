import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAvesComponent } from './app-aves.component';

describe('AppAvesComponent', () => {
  let component: AppAvesComponent;
  let fixture: ComponentFixture<AppAvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
