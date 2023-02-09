import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { RecipeCardComponent } from './components/recipe/recipe-card/recipe-card.component';
import { IngredientCardComponent } from './components/ingredient/ingredient-card/ingredient-card.component';
import { NewRecipeComponent } from './components/recipe/new-recipe/new-recipe.component';
import { RecipeComponent } from './components/recipe/recipe/recipe.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { InstructionFormElComponent } from './components/instruction/instruction-form-el/instruction-form-el.component';
import { RecipeIngredientFormElComponent } from './components/ingredient/recipe-ingredient-form-el/recipe-ingredient-form-el.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { FormatUnitOfMeasurePipe } from './pipes/format-unit-of-measure.pipe';
import { CalculateCaloriesPipe } from './pipes/calculate-calories.pipe';
import { RecipeIngredientComponent } from './components/ingredient/recipe-ingredient/recipe-ingredient.component';
import { DecimalToFractionPipe } from './pipes/decimal-to-fraction.pipe';
import { RecipeShortDialogComponent } from './components/dialogs/recipe-short-dialog/recipe-short-dialog.component';
import { AddIngredientAmountComponent } from './components/ingredient/add-ingredient-amount/add-ingredient-amount.component';
import { FilterIngredientNamePipe } from './pipes/filter-ingredient-name.pipe';
import { FilterRecipeByUserPipe } from './pipes/filter-recipe-by-user.pipe';
import { FilterRecipeByNamePipe } from './pipes/filter-recipe-by-name.pipe';
import { IngredientDialogComponent } from './components/dialogs/ingredient-dialog/ingredient-dialog.component';
import { NewIngredientButtonComponent } from './components/buttons/new-ingredient-button/new-ingredient-button.component';

import { FormatFilterUsernamePipe } from './pipes/format-filter-username.pipe';
import { RecipeFormComponent } from './components/recipe/recipe-form/recipe-form.component';
import { BackToDashboardButtonComponent } from './components/buttons/back-to-dashboard-button/back-to-dashboard-button.component';
import { SaveRecipeButtonComponent } from './components/buttons/save-recipe-button/save-recipe-button.component';
import { BackToRecipeButtonComponent } from './components/buttons/back-to-recipe-button/back-to-recipe-button.component';
import { CreateRecipeButtonComponent } from './components/buttons/create-recipe-button/create-recipe-button.component';
import { EditAppUserComponent } from './components/user/edit-app-user/edit-app-user.component';
import { DeleteIngredientDialogComponent } from './components/dialogs/delete-ingredient-dialog/delete-ingredient-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    RecipeCardComponent,
    IngredientCardComponent,
    NewRecipeComponent,
    RecipeComponent,
    EditRecipeComponent,
    InstructionFormElComponent,
    RecipeIngredientFormElComponent,
    TimeFormatPipe,
    FormatUnitOfMeasurePipe,
    CalculateCaloriesPipe,
    RecipeIngredientComponent,
    DecimalToFractionPipe,
    RecipeShortDialogComponent,
    AddIngredientAmountComponent,
    FilterIngredientNamePipe,
    FilterRecipeByUserPipe,
    FilterRecipeByNamePipe,
    IngredientDialogComponent,
    NewIngredientButtonComponent,
    FormatFilterUsernamePipe,
    RecipeFormComponent,
    BackToDashboardButtonComponent,
    SaveRecipeButtonComponent,
    BackToRecipeButtonComponent,
    CreateRecipeButtonComponent,
    EditAppUserComponent,
    DeleteIngredientDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    DragDropModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
