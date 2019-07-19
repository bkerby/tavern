import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPage } from './pos.page';

describe('PosPage', () => {
  let component: PosPage;
  let fixture: ComponentFixture<PosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
