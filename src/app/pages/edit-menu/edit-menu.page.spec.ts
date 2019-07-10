import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuPage } from './edit-menu.page';

describe('EditMenuPage', () => {
  let component: EditMenuPage;
  let fixture: ComponentFixture<EditMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
