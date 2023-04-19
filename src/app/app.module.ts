import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
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
import { BreakfastComponent } from './components/breakfast/breakfast.component';
import { MainCourseComponent } from './components/main-course/main-course.component';
import { DessertsComponent } from './components/desserts/desserts.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecipesEffects } from './store/effects/recipes.effects';
import { RECIPES_FEATURE_KEY } from './store/state/recipes.state';
import { reducer } from './store/reducers/recipes.reducers';



@NgModule({
  declarations: [
    AppComponent, HomeComponent, BreakfastComponent, MainCourseComponent, DessertsComponent,
    FooterComponent, RecipesListComponent, HeaderComponent, SearchbarComponent, SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
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
    StoreModule.forFeature(RECIPES_FEATURE_KEY, reducer),
    EffectsModule.forRoot([RecipesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
