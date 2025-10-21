import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private accountService: AccountService, private fb: FormBuilder,
    private messagingService: MessageService, private router: Router) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      displayName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }


  register(){
    this.accountService.Register(this.registerForm.value).subscribe({
      next:(res)=>{
        this.messagingService.add({
              key: 'tm',
              severity: 'success',
              summary: 'please login now!'
            });
            this.router.navigate(['main/login'])
      }
    })
  }






}
