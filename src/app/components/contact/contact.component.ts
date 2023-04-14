import { HttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

declare var $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  public title:string;
  datos:FormGroup;

  constructor(private httpclien:HttpClient){
    this.title='Contacto';
    this.datos= new FormGroup({
      //si son mas de dos validaciones se les coloca corchetes
      correo:new FormControl('',[Validators.required,Validators.email]),
      asunto:new FormControl('',Validators.required),
      mensaje:new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    
  }
  envioCorreo(){
    Notiflix.Loading.standard('cargando');
    let params = {
      correo:this.datos.value.correo,
      asunto:this.datos.value.asunto,
      mensaje:this.datos.value.mensaje
    }
    console.log(params)
     /* this.httpclien.post('http://localhost:3700/envio',params).subscribe(resp=>{
      console.log(resp);
      Notiflix.Loading.remove();
      Notiflix.Notify.success('enviado correctamente');
      Notiflix.Notify.failure('no se ha enviado nada');
    })  */
  }
}
