import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SignupSuccessResponse } from './interfaces/signup-success-response';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm:FormGroup;
  loginForm:FormGroup;
  submitted = false;
  loginformsubmitted: boolean=false;
  constructor(private modalService: BsModalService,private formBuilder: FormBuilder,private authService:AuthService,
    private router:Router) {
    this.registerForm= this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]

     });

     this.loginForm= this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]

     });
  }



  ngOnInit(): void {



  }
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };


  openModal(template: TemplateRef<any>) {
    this.submitted = false;
    this.registerForm.reset();
    this.modalRef = this.modalService.show(template, this.config);
  }

  get f() {

      console.log(this.registerForm.controls);
      return this.registerForm.controls;
    }

    onSubmit() {
      this.submitted = true;


      if (this.registerForm.invalid) {
          return;
      }

      this.modalRef?.hide();
      this.authService.register(this.registerForm.value).subscribe((res) => {
        this.setTokenAndRedirect(res);
       // this.router.navigate(['home'],{relativeTo:this.route});
      })

  }

  onLoginSubmit() {
    this.loginformsubmitted = true;


    if (this.loginForm.invalid) {
        return;
    }

      this.authService.login(this.loginForm.value).subscribe((res) => {
      this.setTokenAndRedirect(res);
    })

}


get lg() {
  return this.loginForm.controls;
 }

 setTokenAndRedirect(res: SignupSuccessResponse){
  this.authService.setAccessToken(res.accessToken);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('user', JSON.stringify(res.user));
  this.router.navigateByUrl('/home');
 }

}
