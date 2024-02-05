import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:9000";

const authenticate = "/admin/authenticate"
const user = "/admin/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {  

  }

  getAllUsers() : Observable<any> {
    return this.http.get(baseUrl+user);
  }

  login(credentials : any) : Observable<any> {
    return this.http.post(baseUrl+authenticate, {
      username : credentials.username, 
      password : credentials.password
    }, httpOptions)
  }

  adduser(value : any) : Observable<any> {
    return this.http.post(baseUrl+user,{
      fullName : value.fullname,
      mobileNo : value.mobileno,
      email : value.emailid,
      address : value.address,
      role : value.role,
      username : value.username,
      password : value.password,
    }, httpOptions);
  }

  deleteUser(id : any) : Observable<any> {
    return this.http.delete(baseUrl+user+"/"+id);
  }
}
