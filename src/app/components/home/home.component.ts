import { selectFilteredRecipesByName } from "./../../store/selectors/recipes.selector";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "src/app/classes/recipe";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/state/recipes.state";
import {
  selectRecipesLoading,
  selectRecipesError,
} from "../../store/selectors/recipes.selector";
import * as RecipeActions from "../../store/actions/recipes.actions";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import * as FilteredRecipesActions from "../../store/actions/recipes.actions";
import { take } from "rxjs/operators"; // Import 'take' operator
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesLoading$!: Observable<boolean>;
  recipesError$!: Observable<any>;
  filteredRecipesSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.recipesLoading$ = this.store.pipe(select(selectRecipesLoading));
    this.recipesError$ = this.store.pipe(select(selectRecipesError));
    this.store.dispatch(RecipeActions.loadRecipes());

    this.filteredRecipesSubscription = this.store
      .pipe(select(selectFilteredRecipesByName("")))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    if (this.filteredRecipesSubscription) {
      this.filteredRecipesSubscription.unsubscribe();
    }
  }
  goTo(link: String) {
    this.router.navigate([link]);
  }

  onKey(event: any): void {
    const searchText = event.target.value.trim();
    this.store
      .select(selectFilteredRecipesByName(searchText))
      .pipe(
        take(1) // Use 'take' operator to get the first emitted value and automatically unsubscribe
      )
      .subscribe((filteredRecipes) => {
        this.store.dispatch(
          FilteredRecipesActions.setFilteredRecipes({
            recipes: filteredRecipes,
          })
        );
      });
  }
}
