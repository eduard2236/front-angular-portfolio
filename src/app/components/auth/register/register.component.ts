import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthService]
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(form:any): void {
    this.authService.register(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }
}
