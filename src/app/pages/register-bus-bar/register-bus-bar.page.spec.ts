import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBusBarPage } from './register-bus-bar.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

const FireStub = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (d: any) => new Promise((resolve, reject) => resolve()),
    }),
  }),
};

describe('RegisterBusBarPage', () => {
  let component: RegisterBusBarPage;
  let fixture: ComponentFixture<RegisterBusBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBusBarPage],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        UserService,
        { provide: AngularFireAuth, useValue: FireStub },
        { provide: AngularFirestore, useValue: FireStub },
      ]
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
