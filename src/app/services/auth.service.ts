import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BackendResponses } from '../core/backend.responses';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private currentUserSubject: BehaviorSubject<User|null>;
  //private currentUser: Observable<User|null>;

  constructor(private router: Router, private http: HttpClient, private alertService: AlertService) { 
    //this.currentUserSubject = new BehaviorSubject<User|null> (JSON.parse(localStorage.getItem('currentUser')||'{}'));
    //this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue():User|null {
    let currentuser = localStorage.getItem('currentUser');
    if(currentuser!=null){
      return JSON.parse(currentuser);
    }
    return null;
  }

  login(email:string, password:string ,callback:any) {
    let data ={
      email: email,
      password: password
    };

    this.http.post<BackendResponses>(environment.backend_url + "/login",data)
    .pipe(map(res=>res)).subscribe(res=>{
      if(res.success&&res.data!=undefined){
        this.setUserObject(res.data);
      }else {
        this.alertService.showAlert(res.errorMessage);
      }
      callback(res.success);
    })
  }

  signUp(userName: String,email:String ,password:String,callback:any) {
    let data={
      userName:userName,
      email:email,
      password:password
    };
  
    this.http.post<BackendResponses>(environment.backend_url + "/signup",data)
    .pipe(map(res=>res))
    .subscribe(res=>{
      if(res.success&&res.data!=undefined){
        this.setUserObject(res.data);
      }else {
        this.alertService.showAlert(res.errorMessage);
      }
      callback(res.success)
    });
  }
  setUserObject(data:any) {
    let user = {
      user_id:data.userId,
      email: data.email,
      user_name:data.userName,
      password:data.password
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    //this.currentUserSubject.next(user);
    this.router.navigate(['/home']);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }
}
