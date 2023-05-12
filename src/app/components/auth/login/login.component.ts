import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(form:any): void {
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/');
    });
  }
}
