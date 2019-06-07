import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsPage } from './bars.page';

describe('BarsPage', () => {
  let component: BarsPage;
  let fixture: ComponentFixture<BarsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
