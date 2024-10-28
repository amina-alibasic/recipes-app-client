import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from 'src/assets/search.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/effects/recipes.effects';
import { CategoryEffects } from './store/effects/categories.effects';
import { recipesReducer } from './store/reducers/recipes.reducers';
import { HttpClientModule } from '@angular/common/http';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { categoriesReducer } from './store/reducers/categories.reducers';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipesListComponent,
    HeaderComponent,
    SearchPipe,
    AddRecipeComponent,
    RecipeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('recipes', recipesReducer),
    StoreModule.forFeature('categories', categoriesReducer),
    EffectsModule.forRoot([RecipeEffects, CategoryEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
