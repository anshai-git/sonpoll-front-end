import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFailureComponent } from './registration-failure.component';

describe('RegistrationFailureComponent', () => {
  let component: RegistrationFailureComponent;
  let fixture: ComponentFixture<RegistrationFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
