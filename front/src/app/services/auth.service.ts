import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean>;
  url = 'http://localhost:3000';
  token;

  getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  destroyToken() {
    localStorage.removeItem('jwtToken');
  }

  // buildHeaders(): HttpHeaders {
  //   const headersConfig = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   };

  //   if (this.getToken()) {
  //     headersConfig['Authorization'] = `Token ${this.getToken()}`;
  //   }
  //   return new HttpHeaders(headersConfig);
  // }


  login(email: string, password: string) {
    return this.http.post(this.url + '/users/login', {
      email: email,
      password: password
    });
  }

  logout() {
    this.destroyToken();
    this.loggedIn.next(false);
  }

  constructor(
    private http: HttpClient,
    private _router: Router
    // private toastr: ToastrService
  ) {
    const jwtToken = this.getToken();
    this.loggedIn = new BehaviorSubject<boolean>(jwtToken ? true : false);
  }

  getDashbord() {
    return this.http.get(this.url + '/users/jwt');
  }
}
