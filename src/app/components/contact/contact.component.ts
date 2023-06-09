import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public title: string;
  /* public robot: boolean;
  public presionado: boolean; */
  public captcha:string;

  crearFormulario(){
    return  new FormGroup({
      //si son mas de dos validaciones se les coloca corchetes
      correo:new FormControl('',[Validators.required,Validators.email]),
      name: new FormControl('',[Validators.required,Validators.pattern(/^([a-zñáéíóú]+[\s]*)+$/)]),
      asunto: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  public datos: FormGroup;
 
  constructor(private httpclien: HttpClient) {
    this.title = 'Contacto';
    this.datos = this.crearFormulario();
   
    this.captcha = '';
  }

  ngOnInit(): void {

  }
  envioCorreo() {
    if (this.datos.valid) {
      console.log('el formulario es valido')
      Notiflix.Loading.standard('cargando');
      //se envia mensaje seteado con los datos del formulario y se convierte en plantilla
      let mensajehtml = `<h1>Nombre: ${this.datos.value.name}</h1>
                         <h2>Correo: ${this.datos.value.correo}</h2>
                         <p>Mensaje: ${this.datos.value.mensaje}</p>
                         <p><strong>No Responda este mensaje</strong><p>`;

      let params = {
        //email:this.datos.value.correo,
        asunto: this.datos.value.asunto,
        html:mensajehtml
      }
      console.log(params)
      this.datos.reset();
      this.httpclien.post('https://eduard-api-rest-nodejs-portfolio.onrender.com/api/envio', params).subscribe(resp => {
        console.log(resp);
        Notiflix.Loading.remove();
        if(resp){
          Notiflix.Notify.success('Tu Mensaje se ha enviado correctamente');
        }else{
          Notiflix.Notify.failure('Hay un Error tu mensaje no se ha enviado Correctamente');
        }
        
      })
    } else {
      console.log('el formulario no es valido')
    }

  }

  get asunto() { return this.datos.get('asunto');}
  get mensaje() { return this.datos.get('mensaje'); }
  get correo() { return this.datos.get('correo');}
  get name() { return this.datos.get('name');}
  
  resolved(captchaResponse:string){
    this.captcha = captchaResponse;
  }

}
