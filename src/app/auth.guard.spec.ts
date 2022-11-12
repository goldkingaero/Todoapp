import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routeStateMock: any = { snapshot: {}};
  let routeMock: any = { snapshot: {}};
  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if accessToken exist', () => {
    localStorage.setItem('accessToken', 'somevalue');
    expect(guard.canActivate(routeMock, routeStateMock)).toBeTrue();
  })

  it('should return false if accessToken does not exist', () => {
    localStorage.clear();
    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalse();
  })
});
