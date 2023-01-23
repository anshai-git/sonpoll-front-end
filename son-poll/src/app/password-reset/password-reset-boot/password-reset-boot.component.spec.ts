import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetBootComponent } from './password-reset-boot.component';

describe('PasswordResetComponent', () => {
  let component: PasswordResetBootComponent;
  let fixture: ComponentFixture<PasswordResetBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetBootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
