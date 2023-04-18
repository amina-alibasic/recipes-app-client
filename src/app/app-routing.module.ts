import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakfastComponent } from 'src/components/breakfast/breakfast.component';
import { DessertsComponent } from 'src/components/desserts/desserts.component';
import { HomeComponent } from 'src/components/home/home.component';
import { MainCourseComponent } from 'src/components/main-course/main-course.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'breakfast', component: BreakfastComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'main-course-meals', component: MainCourseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
