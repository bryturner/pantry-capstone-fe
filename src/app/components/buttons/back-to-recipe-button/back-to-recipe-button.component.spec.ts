import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToRecipeButtonComponent } from './back-to-recipe-button.component';

describe('BackToRecipeButtonComponent', () => {
  let component: BackToRecipeButtonComponent;
  let fixture: ComponentFixture<BackToRecipeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackToRecipeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackToRecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
