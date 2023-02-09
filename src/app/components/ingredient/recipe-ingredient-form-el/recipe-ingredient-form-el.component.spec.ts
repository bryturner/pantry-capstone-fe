import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientFormElComponent } from './recipe-ingredient-form-el.component';

describe('RecipeIngredientFormElComponent', () => {
  let component: RecipeIngredientFormElComponent;
  let fixture: ComponentFixture<RecipeIngredientFormElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIngredientFormElComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeIngredientFormElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
