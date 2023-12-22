import { Component, OnInit } from "@angular/core";
import { buttonsToShow } from "../home/home.component";
import { Recipe } from "src/app/classes/recipe";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store/state/recipes.state";
import {
  selectRecipes,
  selectRecipesLoading,
  selectRecipesError,
} from "../../store/selectors/recipes.selector";
import * as RecipeActions from "../../store/actions/recipes.actions";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-desserts",
  templateUrl: "./desserts.component.html",
  styleUrls: ["./desserts.component.css"],
})
export class DessertsComponent implements OnInit {
  recipes!: Recipe[];
  recipesLoading$!: Observable<boolean>;
  recipesError$!: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.recipesLoading$ = this.store.pipe(select(selectRecipesLoading));
    this.recipesError$ = this.store.pipe(select(selectRecipesError));
    this.store.dispatch(RecipeActions.loadRecipes());

    this.store.pipe(select(selectRecipes)).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  buttonsToShow() {
    return buttonsToShow.filter((e) => e.link !== this.router.url);
  }
}
