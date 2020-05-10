import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NbToastrService} from "@nebular/theme";
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userExist:boolean;
 login:FormGroup
 submitted:boolean = false;
 statusInvalid: string;
  constructor(public router: Router, private fb:FormBuilder,private auth:AuthService,
    private api: ApiService, private toasterService:NbToastrService) { }
 
  ngOnInit() {
    this.login = this.fb.group({
      phone:['',Validators.compose([Validators.required,Validators.pattern(/^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/),Validators.maxLength(10)])],
      password:['',Validators.required]
    })
  }
  get f(){
    return this.login.controls;
  }
onSubmit(){
  this.submitted = true;
  if(this.login.invalid){
    return
  }
  console.log(this.login.value);
  this.auth.findUser(this.login.value.phone)
  .subscribe(res => {
    this.userExist = res.User ? true : false;
    console.log('User Exist' + this.userExist)
  
  console.log(this.userExist)
  if(!this.userExist){
    this.statusInvalid = 'This Phone Number Does Not Exist';
    this.invalid('top-right', 'danger');
  
    
  }
  if(this.userExist){
    this.login.patchValue({ phone: this.login.value.phone });
    this.auth.instituteLogin(this.login.value).subscribe(
      (data) => {
        console.log('from api: => ', data)

        if (!data.token) {
          console.log('No token');
          console.log('Invalid credentials')
        
          return;
        }
        this.api.token.next(data.token);
        localStorage.setItem('token',data.token);
        localStorage.setItem('username',data.userName);
        
        if (data.role) {
          localStorage.setItem('role', data.role);
        }

        localStorage.setItem('expireIn',JSON.stringify(data.expireIn));
        if(localStorage.getItem('token'))
        {
        this.showToast('top-right', 'success');
        setTimeout(() => {
          this.router.navigate(['/pages/home']);  
        },1000)  
        
        }
        
      },
      err => {console.log(err.status + ' ' + err.statusText);
      this.statusInvalid = 'Invalid Password';
      this.invalid('top-right', 'danger')
     
     })
  }
  });
 
  }

//  console.log(this.login.value);
 showToast(position, status){
   this.toasterService.show(
     status || 'Success',
     `Login Success`,
     {position, status});
 }
 invalid(position, status){
   this.statusInvalid;
   this.toasterService.show(
     status || 'Danger',
     `${this.statusInvalid}`,
     {position, status});
   
 }  
}
