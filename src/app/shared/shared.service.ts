import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class SharedService  {
    constructor(private http:Http){}

    check_session() {
        this.http.get('http://localhost:3000/api/checksession',  { withCredentials: true})
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });  
      }
}
