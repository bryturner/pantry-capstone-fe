import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeShortDialogComponent } from './recipe-short-dialog.component';

describe('RecipeShortDialogComponent', () => {
  let component: RecipeShortDialogComponent;
  let fixture: ComponentFixture<RecipeShortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeShortDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeShortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
