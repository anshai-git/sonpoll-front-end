import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBootComponent } from './auth-boot.component';

describe('AuthBootComponent', () => {
  let component: AuthBootComponent;
  let fixture: ComponentFixture<AuthBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
