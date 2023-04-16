import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonsToShow } from '../home/home.component';


@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent {

  constructor(private router: Router) { } 

  buttonsToShow(){
    return buttonsToShow.filter(e => e.link !== this.router.url);

  }
}
