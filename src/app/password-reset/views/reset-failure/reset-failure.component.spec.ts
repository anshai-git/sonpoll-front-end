import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFailureComponent } from './reset-failure.component';

describe('ResetFailureComponent', () => {
  let component: ResetFailureComponent;
  let fixture: ComponentFixture<ResetFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
