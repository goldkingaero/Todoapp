import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  BsModalService } from 'ngx-bootstrap/modal';
import { AuthComponent } from './auth.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomepageComponent } from '../homepage/homepage.component';
import { By } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import { SignupSuccessResponse } from './interfaces/signup-success-response';
import { of } from 'rxjs/internal/observable/of';
import { Location } from '@angular/common';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: HomepageComponent,
          },
        ]),
       ],
       providers: [BsModalService],
      declarations: [ AuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create user registeration form', () => {
    expect(component.registerForm).toBeDefined();
  });

  it('should user form be invalid', () => {
    expect(component.registerForm.invalid).toBeTrue();
  });

    it('should invoke openmodal method when  Create New Account button is clicked',()=>{

    const modalSpy = spyOn(component, 'openModal').and.callThrough();
    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#open-modalBtn');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture?.ngZone?.run(fakeAsync(()=>{

      expect(modalSpy).toHaveBeenCalled;
      tick(250);
    }))
 })

it('should invoke register method on authService when registerForm is submitted',()=>{
  const authService=fixture.debugElement.injector.get(AuthService);
  const user = { email: 'vijay@gmail.com', password: '123456' };
expect(component.onSubmit()).toBeFalsy();
component.registerForm.controls['email'].patchValue(user.email);
component.registerForm.controls['password'].patchValue(user.password);
const authRegisterSpy=spyOn(authService, 'register').and.returnValue(of<SignupSuccessResponse>({
  accessToken: 'asecureaccesstoken',
  user: { email: user.email, id: 1 },
}));
component.f;
fixture?.ngZone?.run(fakeAsync(()=>{
  component.onSubmit();
   expect(authRegisterSpy).toHaveBeenCalledOnceWith(user);
  expect(localStorage.getItem('accessToken')).toEqual(
    'asecureaccesstoken'
  );
  const location = fixture.debugElement.injector.get(Location);
  tick(100);
  expect(location.path()).toContain('home');
}))
})

  it('should create user loginForm form', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should loginForm form be invalid', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });
  it('should invoke onLoginSubmit method on login button/submit form click',()=>{
    const submitSpy=spyOn(component,'onLoginSubmit');
    const debugElement=fixture.debugElement;
    const loginform=debugElement.query(By.css('[data-test-id="loginForm"]'));
    component.loginForm.controls['email'].patchValue('vijay@gmail.com');
    component.loginForm.controls['password'].patchValue('123456');
    fixture.detectChanges();
    loginform.triggerEventHandler('submit', {});
    expect(submitSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalledTimes(1);
 })

 it('should invoke login method on authService when loginForm is submitted',()=>{
      const authService=fixture.debugElement.injector.get(AuthService);
      const user = { email: 'vijay@gmail.com', password: '123456' };
    expect(component.onLoginSubmit()).toBeFalsy();
    component.loginForm.controls['email'].patchValue(user.email);
    component.loginForm.controls['password'].patchValue(user.password);
    const authRegisterSpy=spyOn(authService, 'login').and.returnValue(of<SignupSuccessResponse>({
      accessToken: 'asecureaccesstoken',
      user: { email: user.email, id: 1 },
    }));
    component.lg
    fixture?.ngZone?.run(fakeAsync(()=>{
      component.onLoginSubmit();
      expect(authRegisterSpy).toHaveBeenCalledOnceWith(user);
      expect(localStorage.getItem('accessToken')).toEqual(
        'asecureaccesstoken'
      );
      const location = fixture.debugElement.injector.get(Location);
      tick(100);
      expect(location.path()).toContain('home');
    }))
 })

});

