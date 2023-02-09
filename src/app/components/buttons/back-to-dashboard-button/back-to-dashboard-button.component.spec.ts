import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToDashboardButtonComponent } from './back-to-dashboard-button.component';

describe('BackToDashboardButtonComponent', () => {
  let component: BackToDashboardButtonComponent;
  let fixture: ComponentFixture<BackToDashboardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackToDashboardButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackToDashboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
