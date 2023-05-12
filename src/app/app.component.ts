import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
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
    console.log(this.token)
  }
  
  ngOnInit(): void {
    
  }
  logout(){
    this.authService.logout();
  }
}
