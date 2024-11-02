import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Category } from 'src/app/classes/category';
import { Ingredient } from 'src/app/classes/ingredient';
import { Recipe } from 'src/app/classes/recipe';
import { selectCategories } from 'src/app/store/selectors/categories.selector';
import { AppState } from 'src/app/store/state/recipes.state';
import * as RecipeActions from '../../store/actions/recipes.actions';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  // ingredients: Ingredient[] = [];
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.required],
      selectedCategory: [null],
      newCategoryName: [''],
      ingredients: this.fb.array([this.createIngredientFormGroup()]),
      servings: [1, Validators.required],
      recipeDetails: ['', Validators.required],
    });
  }

  @ViewChild('recipeDetailsTextarea') recipeDetailsTextarea!: ElementRef;

  ngOnInit(): void {
    this.store
      .pipe(select(selectCategories))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
    this.checkCategoryInputs();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredientFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  getServingsValue(): number {
    return this.recipeForm.get('servings')?.value;
  }

  increaseServings(): void {
    const currentValue = this.recipeForm.get('servings')?.value;
    this.recipeForm.get('servings')?.setValue(currentValue + 1);
  }

  decreaseServings(): void {
    const currentValue = this.recipeForm.get('servings')?.value;
    this.recipeForm.get('servings')?.setValue(currentValue - 1);
  }

  addNewIngredientsRow(): void {
    this.ingredients.push(this.createIngredientFormGroup());
  }

  removeIngredientsRow(index: number): void {
    this.ingredients.removeAt(index);
  }

  checkCategoryInputs() {
    // Disable newCategoryName based if category was selected in dropdown
    this.recipeForm.get('selectedCategory')?.valueChanges.subscribe((value) => {
      const newCategoryControl = this.recipeForm.get('newCategoryName');
      if (value) {
        newCategoryControl?.disable({ emitEvent: false });
      } else {
        newCategoryControl?.enable({ emitEvent: false });
      }
    });
    // Disable select category dropdown if there is a new category name typed in
    this.recipeForm.get('newCategoryName')?.valueChanges.subscribe((value) => {
      const selectedCategoryControl = this.recipeForm.get('selectedCategory');
      if (value) {
        selectedCategoryControl?.disable({ emitEvent: false });
      } else {
        selectedCategoryControl?.enable({ emitEvent: false });
      }
    });
  }

  clearSelectedCategory() {
    this.recipeForm.get('selectedCategory')?.setValue(null);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe: Recipe = new Recipe(
        this.recipeForm.value.recipeName,
        this.getServingsValue(),
        this.recipeForm.value.selectedCategory,
        this.recipeForm.value.recipeDetails,
        this.recipeForm.value.ingredients
      );
      this.store.dispatch(RecipeActions.postRecipe({ recipe: newRecipe }));
    }
  }

  autoResize(event: any): void {
    const textarea: HTMLTextAreaElement =
      this.recipeDetailsTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 2 + 'px';
  }

  goBack(): void {
    this.router.navigate(['..']);
  }
}
