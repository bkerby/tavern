import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAdminPage } from './bar-admin.page';

describe('BarAdminPage', () => {
  let component: BarAdminPage;
  let fixture: ComponentFixture<BarAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
