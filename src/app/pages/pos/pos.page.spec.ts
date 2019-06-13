import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPage } from './pos.page';

describe('PosPage', () => {
  let component: PosPage;
  let fixture: ComponentFixture<PosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
