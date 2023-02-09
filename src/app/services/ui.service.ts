import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, take } from 'rxjs';
import { PASS_KEY, URL, USER_KEY } from '../data/constants';
import { AppUserDTO } from '../dtos/AppUserDTO';
import { IngredientDTO } from '../dtos/IngredientDTO';
import { RecipeDTO } from '../dtos/RecipeDTO';
import { ExistingRecipeDTO } from '../dtos/ExistingRecipeDTO';
import { RecipeIngredientDTO } from '../dtos/RecipeIngredientDTO';
import { Pages } from '../enums/PageEnum';
import { AppUser } from '../interfaces/AppUser';
import { Ingredient } from '../interfaces/Ingredient';
import { Recipe } from '../interfaces/Recipe';
import { AdjustIngoAmountsDTO } from '../dtos/AdjustIngoAmountsDTO';
import { AdjustAmountDTO } from '../dtos/AdjustAmountDTO';
import { AppUserNoPass } from '../interfaces/AppUserNoPass';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private loading = false;
  private isLoggedIn = false;
  private currentPage = Pages.Login;
  public Pages = Pages;
  private appUser?: AppUser;
  private allAppUsers: AppUserNoPass[] = [];

  // Recipe
  private recipes: Recipe[] = [];
  private recipes$: Subject<Recipe[]> = new Subject();
  private currentRecipe?: Recipe;

  // Ingredient
  private ingredients: Ingredient[] = [];
  private ingredients$: Subject<Ingredient[]> = new Subject();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    const username = window.sessionStorage.getItem(USER_KEY);
    const passowrd = window.sessionStorage.getItem(PASS_KEY);
    if (username !== null && passowrd !== null) {
      this.login(username, passowrd);
    }
  }

  // LOGIN/REGISTER
  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public login(username: string, password: string): void {
    this.loading = true;
    this.http
      .get<AppUser>(`${URL.USER}?username=${username}&password=${password}`)
      .pipe(take(1))
      .subscribe({
        next: (appUser) => {
          this.loginSuccess(appUser);
          this.loading = false;
        },
        error: (e) => {
          this.showError(e.error.message);
          this.loading = false;
        },
      });
  }

  public register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): void {
    const newUser: AppUserDTO = {
      id: null,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    this.http
      .post<AppUserDTO>(URL.USER, newUser)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.login(username, password);
        },
        error: (e) => {
          this.showError(e.error.message);
        },
      });
  }

  private loginSuccess(appUser: AppUser): void {
    window.sessionStorage.setItem(USER_KEY, appUser.username);
    window.sessionStorage.setItem(PASS_KEY, appUser.password);
    this.navigateToPage(Pages.Dashboard);
    this.isLoggedIn = true;
    this.appUser = appUser;
    this.loadRecipes();
    this.loadIngredients();
    this.loadAllUsers();
  }

  public logout(): void {
    window.sessionStorage.clear();
    this.isLoggedIn = false;
    this.navigateToPage(Pages.Login);
  }

  // RECIPE
  private loadRecipes(): void {
    if (!this.appUser) {
      this.showError('Unable to load recipes');
      return;
    }

    this.http
      .get<ExistingRecipeDTO[]>(URL.RECIPE)
      .pipe(take(1))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes
            .map((recipe) => {
              const convertedRecipe: Recipe = {
                id: recipe.id,
                recipeName: recipe.recipeName,
                recipeImage: recipe.recipeImage,
                appUserId: recipe.appUserId,
                appUserFullName: recipe.appUserFullName,
                recipeIngredients: recipe.recipeIngredients,
                prepTime: recipe.prepTime,
                cookTime: recipe.cookTime,
                recipeDescription: recipe.recipeDescription,
                instructions: recipe.instructions.split('&'),
              };

              return convertedRecipe;
            })
            .sort((a, b) => {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            });

          this.recipes$.next(this.recipes);
        },
        error: () => {
          this.showError('Unable to load recipes');
        },
      });
  }

  public createRecipe(
    recipeName: string,
    recipeImage: string,
    instructions: string,
    prepTime: number,
    cookTime: number,
    recipeDescription: string,
    recipeIngredients: RecipeIngredientDTO[]
  ): void {
    if (!this.appUser) return;

    const newRecipe: RecipeDTO = {
      id: null,
      recipeName: recipeName,
      recipeImage: recipeImage,
      instructions: instructions,
      prepTime: prepTime,
      cookTime: cookTime,
      recipeDescription: recipeDescription,
      appUserId: this.appUser.id,
      recipeIngredients: recipeIngredients,
    };

    this.http
      .post<ExistingRecipeDTO>(URL.RECIPE, newRecipe)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('New recipe created!');
          this.loadRecipes();
          this.navigateToPage(Pages.Dashboard);
        },
        error: () => {
          this.showError('Unable to create a new recipe');
        },
      });
  }

  public updateRecipe(
    id: number,
    recipeName: string,
    recipeImage: string,
    instructions: string,
    prepTime: number,
    cookTime: number,
    recipeDescription: string,
    recipeIngredientDTOS: RecipeIngredientDTO[]
  ): void {
    if (!this.appUser) return;

    const updatedRecipe: RecipeDTO = {
      id: id,
      recipeName: recipeName,
      recipeImage: recipeImage,
      instructions: instructions,
      prepTime: prepTime,
      cookTime: cookTime,
      recipeDescription: recipeDescription,
      appUserId: this.appUser.id,
      recipeIngredients: recipeIngredientDTOS,
    };

    this.http
      .put<ExistingRecipeDTO>(`${URL.RECIPE}/${id}`, updatedRecipe)
      .pipe(take(1))
      .subscribe({
        next: (recipe) => {
          const convertedRecipe: Recipe = {
            id: recipe.id,
            recipeName: recipe.recipeName,
            recipeImage: recipe.recipeImage,
            appUserId: recipe.appUserId,
            appUserFullName: recipe.appUserFullName,
            recipeIngredients: recipe.recipeIngredients,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            recipeDescription: recipe.recipeDescription,
            instructions: recipe.instructions.split('&'),
          };
          this.currentRecipe = convertedRecipe;
          this.showSuccess('Recipe successfully updated');
          this.loadRecipes();
          this.navigateToPage(Pages.Recipe);
        },
        error: () => {
          this.showError('Unable to update recipe');
        },
      });
  }

  public deleteRecipe(id: number | undefined): void {
    if (!id) {
      this.showError('Unable to delete recipe');
    }
    this.http
      .delete(`${URL.RECIPE}/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('Recipe successfully deleted');
          this.setCurrentRecipeToUndefined();
          this.loadRecipes();
          this.navigateToPage(Pages.Dashboard);
        },
        error: () => {
          this.showError('Unable to delete recipe');
        },
      });
  }

  public recipesUpdate(): Observable<Recipe[]> {
    return this.recipes$.asObservable();
  }

  public getRecipes(): Recipe[] {
    return this.recipes;
  }

  public getCurrentRecipe(): Recipe | undefined {
    return this.currentRecipe;
  }

  public goToRecipeView(recipe: Recipe | undefined): void {
    if (!recipe) {
      this.showError('Unable to find recipe');
      return;
    }

    if (recipe.recipeIngredients.length === 0) {
      this.showError('You must have at least one ingredient');
      return;
    }

    if (recipe.instructions.length === 0) {
      this.showError('You must have at least one instruction step');
      return;
    }

    this.currentRecipe = recipe;
    this.navigateToPage(Pages.Recipe);
  }

  public goToRecipeEditView(recipe: Recipe | undefined): void {
    if (!recipe) {
      this.showError('Unable to find recipe');
      return;
    }
    this.currentRecipe = recipe;
    this.navigateToPage(Pages.EditRecipe);
  }

  public setCurrentRecipeToUndefined(): void {
    this.currentRecipe = undefined;
  }

  // INGREDIENT
  private loadIngredients(): void {
    this.http
      .get<Ingredient[]>(URL.INGO)
      .pipe(take(1))
      .subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });

          this.ingredients$.next(this.ingredients);
        },
        error: () => {
          this.showError('Unable to load ingredients');
        },
      });
  }

  public createIngredient(newIngredient: IngredientDTO): void {
    this.http
      .post<IngredientDTO>(URL.INGO, newIngredient)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('Created new ingredient!');
          this.loadIngredients();
        },
        error: () => {
          this.showError('Unable to create new ingredient');
        },
      });
  }

  public updateIngredient(updatedIngredient: IngredientDTO): void {
    this.http
      .put<IngredientDTO>(
        `${URL.INGO}/${updatedIngredient.id}`,
        updatedIngredient
      )
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('Pantry item successfully updated');
          this.loadIngredients();
          this.loadRecipes();
        },
        error: () => {
          this.showError('Unable to update ingredient');
        },
      });
  }

  public deleteIngredient(id: number): void {
    this.http
      .delete(`${URL.INGO}/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('Successfully deleted ingredient');
          this.loadIngredients();
        },
        error: () => {
          this.showError('Unable to delete ingredient');
        },
      });
  }

  public ingredientsUpdate(): Observable<Ingredient[]> {
    return this.ingredients$.asObservable();
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  public addToPantryIngredientAmount(
    adjustAmountDTOS: AdjustAmountDTO[]
  ): void {
    const adjustIngoAmountsDTO: AdjustIngoAmountsDTO = {
      adjustAmountDTOS: adjustAmountDTOS,
    };

    this.http
      .put<AdjustIngoAmountsDTO>(URL.INGO, adjustIngoAmountsDTO)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('Successfully added more ingredient to the pantry');
          this.loadIngredients();
          this.loadRecipes();
        },
        error: () => {
          this.showError('Unable to add to pantry ingredient');
        },
      });
  }

  public adjustIngredientAmounts(adjustAmountDTOS: AdjustAmountDTO[]): void {
    const adjustIngoAmountsDTO: AdjustIngoAmountsDTO = {
      adjustAmountDTOS: adjustAmountDTOS,
    };

    this.http
      .put<AdjustIngoAmountsDTO>(URL.INGO, adjustIngoAmountsDTO)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('Ingredients in pantry successfully updated');
          this.setCurrentRecipeToUndefined();
          this.loadIngredients();
          this.loadRecipes();
          this.navigateToPage(Pages.Dashboard);
        },
        error: () => {
          this.showError('Unable to update pantry ingredients');
        },
      });
  }

  // MISC
  public showError(message: string): void {
    this.snackBar.open(message, undefined, { duration: 2000 });
  }

  public showSuccess(message: string): void {
    this.snackBar.open(message, undefined, { duration: 2000 });
  }

  public getLoading(): boolean {
    return this.loading;
  }

  // PAGES
  public navigateToPage(page: Pages): void {
    this.currentPage = page;
  }

  public getCurrentPage(): Pages {
    return this.currentPage;
  }

  // USER(S)
  public getCurrentUserId(): number | undefined {
    if (!this.appUser) return;
    return this.appUser.id;
  }

  public getCurrentUser(): AppUser | undefined {
    if (!this.appUser) return;
    return this.appUser;
  }

  public getCurrentUserFullName(): string | undefined {
    if (!this.appUser) return;
    return this.appUser.firstName + ' ' + this.appUser.lastName;
  }

  private loadAllUsers(): void {
    this.http
      .get<AppUserNoPass[]>(URL.USER)
      .pipe(take(1))
      .subscribe({
        next: (appUsers) => {
          if (!this.appUser) return;

          const removedCurrentAppUser = appUsers.filter(
            (appUser) => appUser.id === this.appUser?.id
          )[0];
          if (!removedCurrentAppUser) {
            this.allAppUsers = appUsers;
            return;
          }

          this.allAppUsers = [
            removedCurrentAppUser,
            ...appUsers.filter((appUser) => appUser.id !== this.appUser?.id),
          ];
        },
        error: () => {
          this.showError('Something went wrong getting all app users');
        },
      });
  }

  public deleteAppUser(id: number | undefined): void {
    if (!id) return;

    this.http
      .delete(`${URL.USER}/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('User successfully deleted');
          window.sessionStorage.clear();
          this.isLoggedIn = false;
          this.navigateToPage(Pages.Login);
          this.appUser = undefined;
        },
        error: () => {
          this.showError('Unable to delete user');
        },
      });
  }

  public getAllAppUsers(): AppUserNoPass[] {
    return this.allAppUsers;
  }

  // add real auth here
  public checkPasswordIsCorrect(password: string): boolean {
    if (window.sessionStorage.getItem(PASS_KEY) === password) return true;

    return false;
  }

  public updateAppUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): void {
    if (!this.appUser) return;

    const updatedAppUser: AppUserDTO = {
      id: this.appUser.id,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    this.http
      .put<AppUser>(`${URL.USER}/${this.appUser.id}`, updatedAppUser)
      .pipe(take(1))
      .subscribe({
        next: (appUser) => {
          this.appUser = appUser;
          window.sessionStorage.setItem(USER_KEY, this.appUser.username);
          window.sessionStorage.setItem(PASS_KEY, this.appUser.password);
          this.loadRecipes();
          this.loadAllUsers();
          this.showSuccess('User information successfully updated');
          this.navigateToPage(Pages.Dashboard);
        },
        error: () => {
          this.showError('Unable to update user information');
        },
      });
  }
}
