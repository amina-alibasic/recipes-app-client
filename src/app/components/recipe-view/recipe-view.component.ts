import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Category } from 'src/app/classes/category';
import { Recipe } from 'src/app/classes/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { selectCategories } from 'src/app/store/selectors/categories.selector';
import { AppState } from 'src/app/store/state/recipes.state';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css'],
})
export class RecipeViewComponent implements OnInit {
  recipe!: Recipe;
  categories: Category[] = [];
  editName = false;
  editIngredients = false;
  editInstructions = false;
  editCategory = false;
  filteredCategories: Category[] = [];
  categoryInput!: Category;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.getRecipeById(Number(recipeId));
    }
    this.store
      .pipe(select(selectCategories))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  getRecipeById(id: number): void {
    this.recipeService.getRecipeById(id).subscribe((data: Recipe) => {
      this.recipe = data;
    });
  }

  enableEdit(field: string): void {
    if (field === 'Category') {
      this.editCategory = true;
      this.categoryInput = this.recipe.category;
      this.filteredCategories = this.categories;
    } else {
      this[`edit${field}`] = true;
    }
  }

  filterCategories(): void {
    const filterValue = this.categoryInput.name.toLowerCase();
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  save(field: string): void {
    if (field === 'Category') {
      this.recipe.category = this.categoryInput;
      this.editCategory = false;
    } else {
      this[`edit${field}`] = false;
    }
    // Call your save logic here (e.g., API call)
  }

  cancel(field: string): void {
    if (field === 'Category') {
      this.categoryInput = this.recipe.category;
      this.editCategory = false;
    } else {
      this[`edit${field}`] = false;
    }
  }
}
