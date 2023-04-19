import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) { }

  @Input() buttonsToShow: ButtonClass[] = []

  goTo(link: String) {
    this.router.navigate([link]);
  }

}

export class ButtonClass {
  title: String = '';
  link: String = '';
}