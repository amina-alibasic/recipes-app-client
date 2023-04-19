import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';

@Component({
  selector: 'app-maincourse',
  templateUrl: './main-course.component.html',
  styleUrls: ['./main-course.component.css']
})
export class MainCourseComponent {

  constructor(private router: Router) { }

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);
  }

}
