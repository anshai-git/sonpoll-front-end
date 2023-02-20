import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.newPasswordForm = formBuilder.group({
      password: formBuilder.control('', [Validators.required]),
      passwordConfirmation: formBuilder.control('', [Validators.required, this.checkPasswordMatching])
    })
  }

  // TODO: create a guard (canActivate) to validate this route based on the (query param) presence of the token in the URL
  ngOnInit(): void {
  }

  checkPasswordMatching: ValidatorFn = (confirmation: AbstractControl): ValidationErrors | null => {
    const password = this.newPasswordForm?.get('password')?.value;
    return password === confirmation.value ? null : { invalidPasswordConfirmation: true }
  }

  onResetPassword() {
    console.log(this.newPasswordForm.value);
  }

}
