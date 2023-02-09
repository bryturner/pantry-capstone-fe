import { Recipe } from './Recipe';

export interface AppUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  recipes: Recipe[];
}
