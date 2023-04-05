import { Component,OnInit } from '@angular/core';
import { Project } from 'src/models/projects';
import { ProjectService } from 'src/services/project.service';
import { Global } from 'src/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit{
  public projects: Project[];
  public url: string;
  constructor(private _projectService: ProjectService){
    this.projects = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProyects().subscribe(
      response =>{
        if(response.proyects){
          this.projects = response.proyects
        }else{

        }
      },
      error =>{
        console.log(<any>error)
      }
    )
  }
  
}
