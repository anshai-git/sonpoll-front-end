import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerification } from './email-verification.component';

describe('CheckEmailComponent', () => {
  let component: EmailVerification;
  let fixture: ComponentFixture<EmailVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerification ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
