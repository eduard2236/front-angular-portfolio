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
  token: boolean;

  

  constructor(private authService: AuthService){ 
    this.token = !this.authService.isAuthenticated()
  }
  
  ngOnInit(): void {

      $(window).scroll(function(){
       
        if($(window).scrollTop() > 0) {
          $('#cm-up').slideDown(300);
          $('.headerPrincipal ul').css('min-height','50px');
          $('.headerPrincipal .ed-img').css('width','60px');
          $('.headerPrincipal').css('background','linear-gradient(to bottom, #80669fd0, #9d98b2d8)');
        } else {
          $('#cm-up').slideUp(300);
          $('.headerPrincipal ul').css('min-height','80px');
          $('.headerPrincipal .ed-img').css('width','110px');
          $('.headerPrincipal').css('background','linear-gradient(to bottom, #80669f, #9d98b2)');
        }
      });
      
      $('.nav-ul a').on('click',function(){
          if($(window).width()< 700){
            $('.nav-ul').slideUp('slow')
          }
      });
      
      $(window).scroll(function(){
        if($(window).width()< 700){
          if($(window).scrollTop() > $('#block').scrollTop()+1800/3) {
            $('#block').slideDown(1000);
           
          } else {
            $('#block').hide(300);
           
          }
        }else{
          if($(window).scrollTop() > $('#block').scrollTop()+850/3) {
            $('#block').slideDown(1000);
           
          } else {
            $('#block').hide(300);
           
          }
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
          $('.navPrincipal>ul').css('display','grid ')    
          $('.navPrincipal .ed-img').css('display','grid')
          $('#menu-movil').slideUp('fast')
        }else{
          $('.navPrincipal>ul').css('display','none')
          $('.navPrincipal .ed-img').css('display','none')
        }
      });
    
      //funcion del icono hamburguesa
      $('.icon-menu').on('click',function(){
        $('#menu-movil').slideToggle('slow');
      })
    }
    

  logout(){
    this.authService.logout();
  }
}
