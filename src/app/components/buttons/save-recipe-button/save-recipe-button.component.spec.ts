import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecipeButtonComponent } from './save-recipe-button.component';

describe('CreateRecipeButtonComponent', () => {
  let component: SaveRecipeButtonComponent;
  let fixture: ComponentFixture<SaveRecipeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveRecipeButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveRecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
