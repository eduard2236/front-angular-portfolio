import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/projects';
import { ProjectService } from 'src/services/project.service';
import { UploadService } from 'src/services/upload.service';
import { Global } from 'src/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService , UploadService],
              
})
export class CreateComponent implements OnInit {
    public title: string;
    public project: Project;
    public status: string;
    public filesToUpload: Array<File>
    constructor(
      private _projectService: ProjectService,
      private _uploadService: UploadService
    ){
      this.title = 'Crear Nuevo Proyecto';
      this.project = new Project('','','','',2023,'','');
      this.status = "";
      this.filesToUpload = [];
    }
    ngOnInit(): void {
      
    }
    onSubmit(form:any){
      // Guardar datos basicos
     
      this._projectService.saveProject(this.project).subscribe(
        response =>{
          if(response.proyect){  
            // Subir la imagen
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.proyect._id, [], this.filesToUpload,"image")
            .then((result:any)=> {
              this.status = "success";
                console.log(result);
                form.reset();
            });

            
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

    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
