import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/models/projects';
import { Global } from './global';

@Injectable()
export class ProjectService{
    public url:string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'probando el servicio de angular'
    }
    saveProject(project: Project):Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-type','application/json');
        return this._http.post(this.url+'save-project', params, {headers: headers});
    }
    getProyects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'projects',{headers: headers});
    }
    getProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'project/'+id,{headers: headers});

    }
    deleteProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'delete/'+id,{headers: headers});
    }
    updateProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'update/'+project._id,params,{headers: headers});
    }
    
}