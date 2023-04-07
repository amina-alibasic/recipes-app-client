import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatTabsModule} from '@angular/material/tabs';
import { HomeComponent } from 'src/components/home/home.component';
import {MatCardModule} from '@angular/material/card';
import { BreakfastComponent } from 'src/components/breakfast/breakfast.component';
import { MaincourseComponent } from 'src/components/maincourse/maincourse.component';
import { DessertsComponent } from 'src/components/desserts/desserts.component';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from 'src/components/footer/footer.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ListComponent } from 'src/components/list/list.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from 'src/components/header/header.component';




@NgModule({
  declarations: [
    AppComponent,HomeComponent, BreakfastComponent,MaincourseComponent, DessertsComponent,
    FooterComponent, ListComponent, HeaderComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
