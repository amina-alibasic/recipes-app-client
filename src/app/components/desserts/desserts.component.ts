import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';
import * as jsonData from '../../../assets/recipes.json';
import { Recipe } from 'src/app/classes/recipe';
import { Store, select } from '@ngrx/store';
import { RecipesState } from 'src/app/store/state/recipes.state';
import * as recipesActions from 'src/app/store/actions/recipes.actions';
import * as recipesSelectors from 'src/app/store/selectors/recipes.selector';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent {
  
  constructor(private router: Router, private readonly store: Store<RecipesState>) { }

  public readonly loaded$: Observable<boolean> = this.store.pipe(
    select(recipesSelectors.getRecipesLoaded)
  );
  public readonly recipes$: Observable<Recipe[]> = this.store.pipe(
    select(recipesSelectors.getAllRecipes)
  );

  recipesx= jsonData;
  recipes: Recipe[] = this.recipesx;
  ngOnInit() {
    this.store.dispatch(recipesActions.Init());
    this.store.dispatch(recipesActions.LoadRecipes());
    console.log(this.recipes$);
  }

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);
  }
}
