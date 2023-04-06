import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';

@Component({
  selector: 'app-maincourse',
  templateUrl: './maincourse.component.html',
  styleUrls: ['./maincourse.component.css']
})
export class MaincourseComponent {

  constructor(private router: Router) { }

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);
  }

}
