import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBusBarPage } from './register-bus-bar.page';

describe('RegisterBusBarPage', () => {
  let component: RegisterBusBarPage;
  let fixture: ComponentFixture<RegisterBusBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBusBarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBusBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
