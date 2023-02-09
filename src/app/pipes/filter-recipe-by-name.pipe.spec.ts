import { FilterRecipeByNamePipe } from './filter-recipe-by-name.pipe';

describe('FilterRecipeByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterRecipeByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
