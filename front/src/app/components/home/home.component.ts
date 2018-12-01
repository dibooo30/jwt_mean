import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this._http.get('http://localhost:3000/users/dashbord').subscribe((res) => {
      console.log(res);
    });
  }

  getjwtData() {
    // this._auth.buildHeaders();
    this._auth.getDashbord().subscribe((res: any) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }
  logOut() {
    this._auth.logout();
    this._router.navigate(['/']);
  }

  postData() {
    this._http.post('http://localhost:3000/users/jwt', {name: 'ahmed', title: 'hellow'}).subscribe(res => console.log(res));
  }
  changeToken() {
    const o = this._auth.getToken();
    localStorage.setItem('jwtToken', '123' + o);
  }
}
