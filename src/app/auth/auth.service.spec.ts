import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const user = { email: 'vijay@gmail.com', password: '123456' };
  beforeEach(() => {
    TestBed.configureTestingModule({  imports: [HttpClientTestingModule],});
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make post request to http://localhost:3000/register', () => {
    let result;
    service.register(user).subscribe(res => result = res);

    const httpMock = httpTestingController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/register'
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toBe('json');
    httpTestingController.verify();
  });

  it('should make post request to http://localhost:3000/login', () => {
    let result;
    service.login(user).subscribe(res => result = res);

    const httpMock = httpTestingController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/login'
    })

    expect(httpMock.cancelled).toBeFalsy();
    expect(httpMock.request.responseType).toBe('json');
    httpTestingController.verify();
  });

 it('should call getAccessToken',
 (done: DoneFn) => {
  service.setAccessToken('somevalue');
  service.getAccessToken().subscribe(value => {
    expect(value).toBe('somevalue');
    done();
 });
});
});
