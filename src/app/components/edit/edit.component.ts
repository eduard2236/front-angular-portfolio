import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/projects';
import { ProjectService } from 'src/services/project.service';
import { UploadService } from 'src/services/upload.service';
import { Global } from 'src/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public save_project: Project;
  public url: string;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {
    this.title = 'Editar Proyecto';
    this.project = new Project('', '', '', '', 2023, '', '');
    this.status = "";
    this.filesToUpload = [];
    this.save_project = new Project('', '', '', '', 0, '', '');
    this.url = Global.url;

  }
  ngOnInit(): void {
    this._route.params.subscribe((params:any) => {
      let id = params["id"];
      this.getProject(id)
    })
  }

  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.proyect;
      },
      error => {
        console.log(<any>error)
      }
    )
  }
  onSubmit(form:any){
    // Guardar datos basicos
   
    this._projectService.updateProject(this.project).subscribe(
      response =>{
        if(response.proyect){  
          // Subir la imagen
          if(this.filesToUpload.length>0){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.projectUpdate._id, [], this.filesToUpload,"image")
            .then((result:any)=> {
              this.status = "success";
                this.save_project = response.proyect;
            });
          }else{
            this.save_project = response.proyect;
            this.status = "success";
            
          }
          
        }else{
          this.status = "failed";
          console.log(this._uploadService);
        }
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
