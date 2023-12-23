import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.component.html",
  styleUrls: ["./add-recipe.component.css"],
})
export class AddRecipeComponent {
  recipeName: string = "";
  selectedCategory: string = "";
  recipeDetails: string = "";

  categories = [
    { value: "breakfast", label: "Breakfast" },
    { value: "mainCourseMeal", label: "Main Course Meal" },
    { value: "dessert", label: "Dessert" },
  ];

  @ViewChild("recipeDetailsTextarea") recipeDetailsTextarea!: ElementRef;

  onSubmit() {
    console.log("Recipe Name:", this.recipeName);
    console.log("Selected Category:", this.selectedCategory);
    console.log("Recipe Details:", this.recipeDetails);
  }

  autoResize(event: any): void {
    const textarea: HTMLTextAreaElement =
      this.recipeDetailsTextarea.nativeElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 2 + "px";
  }
}
