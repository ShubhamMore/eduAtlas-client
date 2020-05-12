import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  phone: string;
  password: string;
}

interface signupType {
  name: string;
  phone: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  findUser(phone: string) {
    return this.http.get<{ User: any }>(environment.server + '/users/' + phone);
  }

  instituteLogin(user: User) {
    return this.http.post<{
      token: string;
      expireIn: string;
      phone: string;
      userName: string;
      role: string;
    }>(environment.server + '/users/login', user);
  }

  instituteSignup(signUp: signupType) {
    console.log('c');
    return this.http.post(environment.server + '/users/signup', signUp);
  }
}
