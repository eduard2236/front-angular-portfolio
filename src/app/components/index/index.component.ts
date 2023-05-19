import { Component, OnInit, Type } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  ngOnInit(): void {
    
    

    const typed = new Typed('.typed', {
      strings: ['<i class="index-name">Soy Eduard Colmenares</i>', '<i class="index-name">Desarrollador Web<i>'],
      /* stringsElement: '.typed', //id del elemento que contiene cadenas de texto a mostrar */
      typeSpeed: 75, //velocidad en milisegundos para cada letra
      startDelay: 300, //tiempo de retraso en iniciar la animacion aplica tambien al inicio del ciclo
      backSpeed: 75, // velocidad en milisegundos para borrar una letra
      smartBackspace: true, //elimina solo palabras que sean nuevas
      shuffle: false, //altera el orden en que se escriben las palabras
      backDelay: 1500, //tiempo despues de escribir una palabra
      loop: true, //repetir array de string
      loopCount: Infinity, //cantidad de veces a repetir en el array infinite
      showCursor: true, // muestra el cursor palpitando
      contentType: 'html',//'html' o 'null' para texto sin formato
    });
  }
}
