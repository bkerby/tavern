import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectPage } from './redirect.page';

describe('RedirectPage', () => {
  let component: RedirectPage;
  let fixture: ComponentFixture<RedirectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
