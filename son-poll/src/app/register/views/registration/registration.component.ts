import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectActionStatus} from '../../ngrx/registration.selectors';
import {RegistrationState} from '../../ngrx/regitration.store';
import {SignUpRequest} from "../../../sp-common/request/sign-up.request";
import {ApiRequest} from "../../../sp-common/api/ApiRequest";
import {signUp} from "../../ngrx/registration.actions";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<RegistrationState>
  ) {
    this.signUpForm = formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
      username: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required]),
      passwordConfirmation: formBuilder.control('', [Validators.required, this.checkPasswordMatching]),
    });
  }

  isActionInProgress!: boolean;
  actionStatusSubscription!: Subscription;

  ngOnInit(): void {
    this.actionStatusSubscription = this.store$.select(selectActionStatus).subscribe(status => {
      this.isActionInProgress = status;
    })
  }

  ngOnDestroy(): void {
    this.actionStatusSubscription.unsubscribe();
  }

  onSignUp() {
    const { email, username, password } = this.signUpForm.value;
    const signUpRequest: SignUpRequest = new SignUpRequest(email, username, password);
    const apiRequest: ApiRequest<SignUpRequest> = ApiRequest.of<SignUpRequest>(signUpRequest);
    const actionPayload = { payload: apiRequest };

    this.store$.dispatch(signUp(actionPayload));
    this.signUpForm.reset();
  }

  checkPasswordMatching: ValidatorFn = (confirmation: AbstractControl): ValidationErrors | null => {
    const password = this.signUpForm?.get('password')?.value;
    return password === confirmation.value ? null : { invalidPasswordConfirmation: true }
  }
}
