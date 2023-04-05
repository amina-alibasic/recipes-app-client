import { Component } from '@angular/core';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent {
  recipes = [
    {
      title: 'Title Title Title Title',
      category: 'Category'
    },
    {
      title: 'Title TitleTitle',
      category: 'Category'
    },
    {
      title: 'Title Title',
      category: 'Category'
    },
    {
      title: 'Title',
      category: 'Category'
   
    },
    {
      title: 'Title',
      category: 'Category'
    },
    {
      title: 'Title',
      category: 'Category'

    },
    {
      title: 'Title',
      category: 'Category'
    }
  ]
}
