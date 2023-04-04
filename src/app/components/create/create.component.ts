import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/projects';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {
    public title: string;
    public project: Project;
    constructor(
      private _projectService: ProjectService
    ){
      this.title = 'Crear proyecto';
      this.project = new Project('','','','',2023,'','');
      
    }
    ngOnInit(): void {
      
    }
    onSubmit(form:any){

    }
}
