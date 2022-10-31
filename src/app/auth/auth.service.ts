import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { SignupSuccessResponse } from './interfaces/signup-success-response';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private accessToken$:BehaviorSubject<string>;

  constructor(private http:HttpClient) {
    this.accessToken$=new BehaviorSubject(localStorage.getItem('accessToken')||'');
  }

  public register(data: User) {
    return this.http.post<SignupSuccessResponse>(`http://localhost:3000/register`, data)
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken$.next(accessToken)
  }
  public getAccessToken(): Observable<string> {
    return this.accessToken$.asObservable();
  }

  public login(data: User) {
    return this.http.post<SignupSuccessResponse>(
      `http://localhost:3000/login`,
      data
    );
  }
}
