import { Component, OnInit,HostListener } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit{
  title = 'portfolio-angular';
  token: any;

  

  constructor(private authService: AuthService){ 
    this.token = localStorage.getItem("ACCESS_TOKEN")
  }
  
  ngOnInit(): void {
    
      $(window).scroll(function(){
        if($(window).scrollTop() > 0) {
          $('#cm-up').slideDown(300);
          $('.headerPrincipal ul').css('min-height','50px');
        } else {
          $('#cm-up').slideUp(300);
          $('.headerPrincipal ul').css('min-height','80px');
        }
      });
      $('#cm-up').on('click', function(){
        $('body, html').animate({
          scrollTop: 0
        }, 700);
        return false;
      });

      $(window).resize(function() {
        if($(window).width() > 683) {
          $('.headerPrincipal ul').css('display','grid')
        }else{
          $('.headerPrincipal ul').css('display','none')
        }
      });
    
      //funcion del icono hamburguesa
      $('.icon-menu').on('click',function(){
        $('.nav-ul').slideToggle('slow');
      })
    }
    

  logout(){
    this.authService.logout();
  }
}
