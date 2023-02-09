import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientAmountComponent } from './add-ingredient-amount.component';

describe('AddIngredientAmountComponent', () => {
  let component: AddIngredientAmountComponent;
  let fixture: ComponentFixture<AddIngredientAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngredientAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIngredientAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
