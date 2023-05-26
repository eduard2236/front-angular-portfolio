import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from 'src/app/models/user';
import { JwtResponseI } from 'src/app/models/jwt-response';
import { pipe, tap } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { Global } from './global';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable()
export class AuthService {
  AUTH_SERVER: string = Global.url;
  authSubject = new BehaviorSubject(false);
  private token: any;
  constructor(private httClient: HttpClient , private router: Router, ) {
    this.token = "";
   }

   register(user: UserI): Observable<JwtResponseI>{
    return this.httClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
    user).pipe(tap(
    (res:JwtResponseI)=>{
      if(res){
        //guardar token
        this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
      }
    })
    );
  }

  login(user: UserI): Observable<JwtResponseI>{
    return this.httClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
    user).pipe(tap(
    (res:JwtResponseI)=>{
      if(res){
        //guardar token
        this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        window.location.replace('/crear-proyectos');
      }
    })
    );
  }

  public isAuthenticated():boolean{
    const token3 = localStorage.getItem('ACCESS_TOKEN');
    return !helper.isTokenExpired(token3);

  }

  logout():void{
    this.token= ""
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    window.location.replace('/inicio');;
    
  }

  recarga(){
    window.location.reload();
  }
  private saveToken(token: string, expiresIn:string): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token= token;
  }

  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token
  }

  checkToken() {
      let number = this.getToken
      return number;
  }

  
}
