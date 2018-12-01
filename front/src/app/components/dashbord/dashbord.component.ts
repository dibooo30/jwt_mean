import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _http: HttpClient

  ) { }

  ngOnInit() {
    // this._http.get('http://localhost:3000/users/dashbord').subscribe((res) => {
    //   console.log(res);
    // });
  }

}
