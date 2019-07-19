import { TestBed } from '@angular/core/testing';

import { BarService } from './bar.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

const FireStub = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (d: any) => new Promise((resolve, reject) => resolve()),
    }),
  }),
};

describe('BarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
      RouterTestingModule,
    ],
    providers: [
      UserService,
      { provide: AngularFireAuth, useValue: FireStub },
      { provide: AngularFirestore, useValue: FireStub },
    ]
  }));

  it('should be created', () => {
    const service: BarService = TestBed.get(BarService);
    expect(service).toBeTruthy();
  });
});
