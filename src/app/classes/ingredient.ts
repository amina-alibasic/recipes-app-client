export class Ingredient {
  id?: number;
  name: string;
  quantity: string;

  constructor(name: string, quantity: string) {
    this.name = name;
    this.quantity = quantity;
  }
}
