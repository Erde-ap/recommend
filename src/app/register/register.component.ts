import { Component } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email='';

  constructor(private http:Http){}

  onSubmit(){
    let params = new URLSearchParams();
    params.set('email', this.email);  

    this.http.post('http://localhost:3000/api/register', params, { withCredentials: true })
    .subscribe(
      data => console.log(data),
      error => console.log(error) 
    ) 
  }

  nav_flag = false;
  nav_state(){
    if(this.nav_flag == false){
      this.nav_flag = true;
    }else{
      this.nav_flag = false;
    }
  }
}
