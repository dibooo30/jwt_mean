import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;
  constructor(
    private _http: HttpClient,
    private _auth: AuthService,
    private _routing: Router
  ) {

  }

  ngOnInit(): void {

  }

  login() {
      this._auth.login(this.email, this.password).subscribe((resp: any) => {
        if (resp.success) {
          this._auth.saveToken(resp.token);
          this._auth.getToken();
          this._auth.loggedIn.next(true);
          this._auth.token = resp.token;
          console.log(' Success !!');
          this._routing.navigate(['/home']);
        } else {
          console.log('Error >', resp.errorMessage);
          this._routing.navigate(['/error']);

        }

        // this.toastr.success(resp && resp.user && resp.user.name ? `Welcome ${resp.user.name}` : 'Logged in!');
      }, (errorResp) => {
        this._auth.loggedIn.next(undefined);
        console.log('Error >', errorResp);
        // errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
      });
  }
}
