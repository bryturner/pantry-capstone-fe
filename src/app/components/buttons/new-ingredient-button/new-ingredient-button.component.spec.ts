import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngredientButtonComponent } from './new-ingredient-button.component';

describe('NewIngredientButtonComponent', () => {
  let component: NewIngredientButtonComponent;
  let fixture: ComponentFixture<NewIngredientButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIngredientButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIngredientButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
