import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserI } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  public status: boolean
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, public fb: FormBuilder) {
    this.status= true
    this.myForm = this.fb.group({
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required]],
    });
   }

   saveData(){
    console.log(this.myForm.value);
  }

  onLogin(form:any): void {
    this.authService.login(form.value).subscribe(res => {
      if(res){
        console.log(res)
        this.router.navigateByUrl('/crear-proyectos');
      }else{
        this.status = true
      }
      
    });
  }
}
