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
 
  crearFormulario(){
    return  new FormGroup({
      //si son mas de dos validaciones se les coloca corchetes
      //correo:new FormControl('',[Validators.required,Validators.email]),
      asunto: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  public datos: FormGroup;
 
  constructor(private httpclien: HttpClient) {
    this.title = 'Contacto';
    this.datos = this.crearFormulario();
  }

  ngOnInit(): void {

  }
  envioCorreo() {
    if (this.datos.valid) {
      console.log('el formulario es valido')
      Notiflix.Loading.standard('cargando');
      let params = {
        //email:this.datos.value.correo,
        asunto: this.datos.value.asunto,
        mensaje: this.datos.value.mensaje
      }
      console.log(params)
      this.datos.reset();
      this.httpclien.post('http://localhost:3700/api/envio', params).subscribe(resp => {
        console.log(resp);
        Notiflix.Loading.remove();
        Notiflix.Notify.success('enviado correctamente');
      })
    } else {
      console.log('el formulario no es valido')
    }

  }

  get asunto() { return this.datos.get('asunto');}
  get mensaje() { return this.datos.get('mensaje'); }


}
