import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBootComponent } from './register-boot.component';

describe('RegisterBootComponent', () => {
  let component: RegisterBootComponent;
  let fixture: ComponentFixture<RegisterBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
