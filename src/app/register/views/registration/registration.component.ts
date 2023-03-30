import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {ActionsSubject, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {RegistrationState} from '../../ngrx/regitration.store';
import {SignUpRequest} from '../../../sp-common/request/sign-up.request';
import {ApiRequest} from '../../../sp-common/api/ApiRequest';
import {RegistrationActions, sign_up} from '../../ngrx/registration.actions';
import {ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {is_action_in_progress} from '../../ngrx/registration.selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('sign_up_button', {static: true}) sign_up_button: ElementRef = {} as ElementRef<HTMLButtonElement>;

  sign_up_form: FormGroup;
  signup_form_subscription: Subscription;

  is_signup_action_in_progress!: boolean;
  signup_action_status_subscription!: Subscription;

  actionStatusSubscription!: Subscription;
  signup_action_subscription!: Subscription;

  constructor(
    private form_builder: FormBuilder,
    private store$: Store<RegistrationState>,
    private actions$: ActionsSubject,
    private router: Router
  ) {
    this.sign_up_form = form_builder.group({
      email: form_builder.control('', [Validators.required, Validators.email]),
      username: form_builder.control('', [Validators.required]),
      password: form_builder.control('', [Validators.required]),
      password_confirmation: form_builder.control('', [
        Validators.required,
        this.password_confirmation_validator,
      ]),
    });
    this.signup_form_subscription = this.sign_up_form.valueChanges.subscribe(
      (change) => {
        this.sign_up_button.nativeElement.disabled = !this.sign_up_form.valid;
      }
    );
  }

  ngOnInit(): void {
    this.actionStatusSubscription = this.store$
      .select(is_action_in_progress(RegistrationActions.SIGN_UP))
      .subscribe((value) => {
        console.log(value);
        this.is_signup_action_in_progress = value;
      });

    this.signup_action_status_subscription = this.actions$
      .pipe(
        ofType(
          RegistrationActions.SIGN_UP_SUCCESS,
          RegistrationActions.SIGN_UP_FAILURE
        )
      )
      .subscribe((res) => {
        this.sign_up_form.reset();
        this.handle_signup_result.bind(this);
      });
  }

  ngOnDestroy(): void {
    this.actionStatusSubscription.unsubscribe();
    this.signup_action_status_subscription.unsubscribe();
  }

  handle_signup_result(action: any) {
    switch (action.type) {
      case RegistrationActions.SIGN_UP_SUCCESS:
        this.router.navigate(['signupSuccess']);
        break;
      case RegistrationActions.SIGN_UP_FAILURE:
        this.router.navigate(['signupFailure']);
        break;
      default:
        this.router.navigate(['not-found']);
        break;
    }
  }

  onSignUp() {
    const {email, username, password} = this.sign_up_form.value;
    const signUpRequest: SignUpRequest = new SignUpRequest(email, username, password);
    const apiRequest: ApiRequest<SignUpRequest> = ApiRequest.of<SignUpRequest>(signUpRequest);
    const actionPayload = {payload: apiRequest};

    this.store$.dispatch(sign_up(actionPayload));
  }

  password_confirmation_validator: ValidatorFn = (
    confirmation: AbstractControl
  ): ValidationErrors | null => {
    const password = this.sign_up_form?.get('password')?.value;
    return password === confirmation.value
      ? null
      : {invalid_password_confirmation: true};
  };
}
