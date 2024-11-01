import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Category } from 'src/app/classes/category';
import { Ingredient } from 'src/app/classes/ingredient';
import { selectCategories } from 'src/app/store/selectors/categories.selector';
import { AppState } from 'src/app/store/state/recipes.state';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  // servings: number = 1;
  ingredients: Ingredient[] = [];
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.required],
      selectedCategory: ['', Validators.required],
      newCategoryName: [''],
      ingredients: [[]],
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
    this.ingredients.push({ name: '', quantity: '' });
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
    this.ingredients.push({ name: '', quantity: '' });
  }

  removeIngredientsRow(index: number): void {
    this.ingredients = this.ingredients.filter((_, i) => i !== index);
  }

  onSubmit() {
    console.log(this.recipeForm);
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
