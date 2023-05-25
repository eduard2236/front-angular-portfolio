import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  constructor(private router: Router  ){

  }
  redirect(flag: boolean):any{
    if(!flag){
      this.router.navigate(['/','auth'])
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token2 = localStorage.getItem("ACCESS_TOKEN");
      if( token2 != null){
        return true;
      }else{
        this.router.navigate(['/','crear-proyectos']);    
        return false;

      }
    
  }
  
}
