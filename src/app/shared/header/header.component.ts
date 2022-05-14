import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({
  providedIn:'root'
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private authservice:AuthService) { }
  currentUser = this.authservice.currentUserValue;
  isLoggedIn = false;
  signIn(){
    this.router.navigate(['/login'])
  }

  signOut(){
    this.authservice.logOut();
    this.isLoggedIn=false;
  }
  ngOnInit(): void {
    if(this.currentUser) {
      this.isLoggedIn = true;
    }
  }

}
