import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router  ) {}


  
  clickOnTab(event: MatTabChangeEvent){
    // indexing starts at 0 and increases sequentially in the order of tab titles
      switch(event.index){
        case 0:
         this.router.navigate(['/home']);
          break;
        case 1:
         this.router.navigate(['/desserts']);
          break;
        case 2:
         this.router.navigate(['/breakfasts']);
          break;
        case 3:
         this.router.navigate(['/main-course-meals']);
          break;
        default:
         this.router.navigate(['/home']);
      }
  }
}
