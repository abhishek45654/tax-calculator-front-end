import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AlertService } from "../services/alert.service";
import { AuthService } from "../services/auth.service";


@Injectable({
    providedIn:'root'
})
export class AuthGaurd implements CanActivate{

    constructor(private router: Router, private authService: AuthService, private alertService:AlertService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = this.authService.currentUserValue;
        if(currentUser) {
            return true;
        }
        this.alertService.showAlert("Login to continue");
        this.router.navigate(['/login']);
        return false;
    }
}