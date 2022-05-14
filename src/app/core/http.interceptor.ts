import { Injectable } from "@angular/core";
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable()
export class BasicInterceptor implements HttpInterceptor {

    constructor() {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser') || "{}");
        if (currentUser != null) {
            req = req.clone({
                setHeaders: {
                    Authorisation:'Basic ' + btoa(currentUser.email+':'+currentUser.password)
                    
                }
            });
        }
        return next.handle(req);
    }
}