import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIngredientDialogComponent } from './delete-ingredient-dialog.component';

describe('DeleteIngredientDialogComponent', () => {
  let component: DeleteIngredientDialogComponent;
  let fixture: ComponentFixture<DeleteIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteIngredientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
