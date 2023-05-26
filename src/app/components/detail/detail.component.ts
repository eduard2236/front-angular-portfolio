import { Component,OnInit  } from '@angular/core';
import { Global } from 'src/services/global';
import { Project } from 'src/models/projects';
import { ProjectService } from 'src/services/project.service';
import { Route,ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService , AuthService]
})
export class DetailComponent implements OnInit {
    public url: string;  
    public project: Project;
    public confirm:boolean;
    public token:boolean;
  constructor(private _projectService: ProjectService,
              private _router: Router,
              private _route: ActivatedRoute,
              private authService: AuthService
              ){
        this.url = Global.url;
        this.project = new Project('','','','',0,'','');
        this.confirm = false;
        this.token = !this.authService.isAuthenticated();
    }

    ngOnInit(): void {
        this._route.params.subscribe(params =>{
          let id = params["id"];
          this.getProject(id)
        })
    }

    getProject(id:any){
      this._projectService.getProject(id).subscribe(
        response =>{
          this.project = response.proyect;
        },
        error=>{
          console.log(<any>error)
        }
      )
    }

    setConfirm(confirm: any){
      this.confirm= confirm;
    }
    deleteProject(id:any){
      this._projectService.deleteProject(id).subscribe(
        response =>{
          if(response){
            this._router.navigate(['/proyectos']);
            console.log('se ha borrado bien');
          }   
        },
        error=>{
          console.log(<any>error)
        }
      )
    }
}
