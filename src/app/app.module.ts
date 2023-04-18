import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from 'src/components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { BreakfastComponent } from 'src/components/breakfast/breakfast.component';
import { MainCourseComponent } from 'src/components/main-course/main-course.component';
import { DessertsComponent } from 'src/components/desserts/desserts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { FooterComponent } from 'src/components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RecipesListComponent } from 'src/components/recipes-list/recipes-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from 'src/components/header/header.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchbarComponent } from 'src/components/searchbar/searchbar.component';



@NgModule({
  declarations: [
    AppComponent, HomeComponent, BreakfastComponent, MainCourseComponent, DessertsComponent,
    FooterComponent, RecipesListComponent, HeaderComponent, SearchbarComponent
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
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
