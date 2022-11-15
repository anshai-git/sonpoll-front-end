import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformBootComponent } from './platform-boot.component';

describe('PlatformBootComponent', () => {
  let component: PlatformBootComponent;
  let fixture: ComponentFixture<PlatformBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
