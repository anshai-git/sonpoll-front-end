import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetCompleteComponent } from './password-reset-complete.component';

describe('PasswordResetComponent', () => {
  let component: PasswordResetCompleteComponent;
  let fixture: ComponentFixture<PasswordResetCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
